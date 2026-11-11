#!/usr/bin/env python3
"""Build static/resume/ryan-nemeth-resume.pdf from content/cv.md.

cv.md is parsed into a small JSON structure which resume.typ lays out.
Requires typst (https://typst.app) on PATH.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SRC = ROOT / "content" / "cv.md"
OUT = ROOT / "static" / "resume" / "ryan-nemeth-resume.pdf"

LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
BOLD_LINE = re.compile(r"^\*\*(.+?)\*\*$")
ORG_DATE = re.compile(r"^\*\*(.+?)\*\*\s+-\s+(.+)$")  # **Aprimo** - 03/2026 - Present
PLAIN_ORG_DATE = re.compile(r"^(.+?)\s+-\s+(\d{2}/\d{4}\s+-\s+.+)$")  # School - 01/2016 - 12/2016

# Bullets in these sections are "Name - Issuer".
SPLIT_ISSUER = {"certifications"}


def plain(s):
    s = LINK.sub(r"\1", s)
    return re.sub(r"\*\*(.+?)\*\*", r"\1", s).strip()


def strip_front_matter(text):
    if text.startswith("---\n"):
        end = text.index("\n---", 4)
        return text[end + 4 :]
    return text


def paragraphs(lines):
    """Split lines into blank-line separated chunks."""
    chunk = []
    for line in lines:
        if line.strip():
            chunk.append(line.rstrip())
        elif chunk:
            yield chunk
            chunk = []
    if chunk:
        yield chunk


def is_list(chunk):
    return all(l.startswith("- ") for l in chunk)


def body_blocks(chunks):
    blocks = []
    for chunk in chunks:
        if is_list(chunk):
            blocks.append({"ul": [plain(l[2:]) for l in chunk]})
        else:
            blocks.append({"p": plain(" ".join(chunk))})
    return blocks


def parse_job(title, lines):
    entry = {"title": plain(title), "body": []}
    chunks = list(paragraphs(lines))
    if chunks and (m := ORG_DATE.match(chunks[0][0])):
        entry["org"], entry["date"] = m.group(1), m.group(2)
        if len(chunks[0]) > 1:
            entry["location"] = plain(chunks[0][1])
        chunks = chunks[1:]
    entry["body"] = body_blocks(chunks)
    return entry


def parse_bold_entry(chunk):
    entry = {"title": BOLD_LINE.match(chunk[0]).group(1), "body": []}
    rest = chunk[1:]
    if rest and (m := PLAIN_ORG_DATE.match(rest[0])):
        entry["org"], entry["date"] = plain(m.group(1)), m.group(2)
        rest = rest[1:]
    if rest:
        entry["body"] = [{"p": plain(" ".join(rest))}]
    return entry


def parse_list_item(item, section):
    m = LINK.fullmatch(item)
    if m:
        return {"title": m.group(1), "url": m.group(2), "body": []}
    if section in SPLIT_ISSUER and " - " in item:
        name, issuer = item.rsplit(" - ", 1)
        return {"title": plain(name), "subtitle": plain(issuer), "body": []}
    return {"title": plain(item), "body": []}


def parse_section(title, lines):
    key = title.lower()
    section = {"title": title}

    if any(l.startswith("### ") for l in lines):
        entries, current, buf = [], None, []
        for line in lines:
            if line.startswith("### "):
                if current is not None:
                    entries.append(parse_job(current, buf))
                current, buf = line[4:], []
            elif current is not None:
                buf.append(line)
        if current is not None:
            entries.append(parse_job(current, buf))
        section["entries"] = entries
        return section

    chunks = list(paragraphs(lines))
    if key == "skills":
        section["tags"] = [t.strip() for t in " ".join(sum(chunks, [])).split(",") if t.strip()]
    elif chunks and all(BOLD_LINE.match(c[0]) for c in chunks):
        section["entries"] = [parse_bold_entry(c) for c in chunks]
    elif len(chunks) == 1 and is_list(chunks[0]):
        section["entries"] = [parse_list_item(l[2:].strip(), key) for l in chunks[0]]
    else:
        section["body"] = body_blocks(chunks)
    return section


def parse(text):
    cv = {"name": "", "tagline": "", "links": [], "sections": []}
    lines = strip_front_matter(text).splitlines()
    i = 0
    # Header: everything before the first "## " heading.
    while i < len(lines) and not lines[i].startswith("## "):
        line = lines[i].strip()
        if line.startswith("# "):
            cv["name"] = line[2:].strip()
        elif line and LINK.sub("", line).strip() == "":
            for text_, url in LINK.findall(line):
                if "pdf" not in text_.lower():
                    cv["links"].append({"text": text_, "url": url})
        elif line:
            cv["tagline"] = plain(line)
        i += 1

    title, buf = None, []
    for line in lines[i:]:
        if line.startswith("## "):
            if title:
                cv["sections"].append(parse_section(title, buf))
            title, buf = line[3:].strip(), []
        else:
            buf.append(line)
    if title:
        cv["sections"].append(parse_section(title, buf))
    return cv


def main():
    cv = parse(SRC.read_text(encoding="utf-8"))
    if "--json" in sys.argv:
        json.dump(cv, sys.stdout, indent=2, ensure_ascii=False)
        return
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "typst", "compile",
            "--font-path", str(HERE / "fonts"),
            "--ignore-system-fonts",
            "--input", "cv=" + json.dumps(cv, ensure_ascii=False),
            str(HERE / "resume.typ"),
            str(OUT),
        ],
        check=True,
    )
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
