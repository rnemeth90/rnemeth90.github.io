#!/usr/bin/env python3
"""Generate a notes skeleton for a Linux Foundation / CNCF exam.

Usage:
    new_exam_notes.py LFCS
    new_exam_notes.py LFCS --out ~/repos/notes/systems
    new_exam_notes.py XYZ --url https://training.linuxfoundation.org/certification/<slug>/
    new_exam_notes.py LFCS --dry-run

Scrapes the "Domains & Competencies" section of the exam's training.linuxfoundation.org
page, then adds a link to <out>/README.md (if present) and creates <out>/<abbr>/ with a README.md (same layout as the other exam
READMEs), an examinfo.yaml, and one directory per domain with a README.md holding
the competencies as a topic checklist. Existing files are never overwritten
unless --force is given. Standard library only.
"""

import argparse
import html
import re
import sys
import urllib.request
from pathlib import Path

BASE = "https://training.linuxfoundation.org/certification/"

# abbreviation -> page slug on training.linuxfoundation.org
SLUGS = {
    "LFCS": "linux-foundation-certified-sysadmin-lfcs",
    "LFCA": "linux-foundation-certified-it-associate-lfca",
    "CKA": "certified-kubernetes-administrator-cka",
    "CKAD": "certified-kubernetes-application-developer-ckad",
    "CKS": "certified-kubernetes-security-specialist-cks",
    "KCNA": "kubernetes-and-cloud-native-associate-kcna",
    "KCSA": "kubernetes-and-cloud-native-security-associate-kcsa",
    "PCA": "prometheus-certified-associate",
    "CAPA": "certified-argo-project-associate-capa",
    "CGOA": "certified-gitops-associate-cgoa",
    "ICA": "istio-certified-associate-ica",
    "CCA": "cilium-certified-associate-cca",
    "OTCA": "opentelemetry-certified-associate-otca",
    "CNPA": "certified-cloud-native-platform-engineering-associate-cnpa",
    "CBA": "certified-backstage-associate-cba",
}


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s))).strip()


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def parse(page):
    m = re.search(r"<title>(.*?)</title>", page, re.S)
    title = clean(m.group(1)).split(" - ")[0] if m else ""
    domains = []
    articles = re.findall(
        r'<span class="[^"]*article-text">(.*?)<span>\s*([\d.]+)\s*%\s*</span></span>'
        r'.*?article-group">(.*?)</section>',
        page,
        re.S,
    )
    for name, weight, body in articles:
        items = [clean(x) for x in re.split(r"<br\s*/?>", body)]
        domains.append(
            {
                "name": clean(name),
                "weight": float(weight),
                "topics": [i for i in items if i],
            }
        )
    return title, domains


def fmt_weight(w):
    return str(int(w)) if w == int(w) else str(w)


def domain_readme(d):
    lines = [
        f"# {d['name']} ({fmt_weight(d['weight'])}%)",
        "",
        f"Notes on {d['name'].lower()}.",
        "",
        "## Topics",
        "",
    ]
    lines += [f"- [ ] {t}" for t in d["topics"]]
    for t in d["topics"]:
        lines += ["", f"## {t}", ""]
    return "\n".join(lines) + "\n"


def exam_readme(title, abbr, url, domains, has_info):
    lines = [
        f"# {title} ({abbr}) Notes",
        "",
        f"Study notes for the {abbr} exam, organized by exam domain.",
        "",
        f"- [Official exam page]({url})",
    ]
    if has_info:
        lines.append("- [Exam info](./examinfo.yaml)")
    lines += ["", "## Directory map (by exam domain)", ""]
    for d in domains:
        lines.append(f"- [{d['name']} ({fmt_weight(d['weight'])}%)](./{d['dir']}/)")
    return "\n".join(lines) + "\n"


def examinfo(title, abbr, url, domains):
    lines = [
        "---",
        "exam:",
        f"  name: {title}",
        f"  abbreviation: {abbr}",
        "  provider: Linux Foundation",
        f"  official_page: {url}",
        "",
        "domains:",
    ]
    for d in domains:
        lines += [
            f"  - name: {d['name']}",
            f"    weight_percent: {fmt_weight(d['weight'])}",
            f"    dir: {d['dir']}",
        ]
    return "\n".join(lines) + "\n"


def add_root_link(out, name, dry_run):
    """Insert "- [name](./name/)" into <out>/README.md, keeping the list sorted."""
    readme = out / "README.md"
    if not readme.exists():
        return
    lines = readme.read_text().split("\n")
    link = f"- [{name}](./{name}/)"
    pat = re.compile(r"^- \[([^\]]+)\]\(\./([^/)]+)/?\)\s*$")
    idx = [i for i, l in enumerate(lines) if pat.match(l)]
    if any(pat.match(lines[i]).group(2) == name for i in idx):
        print(f"skip (exists)  README.md link to {name}")
        return
    if not idx:
        print(f"warning: no directory list found in {readme}; add the link manually", file=sys.stderr)
        return
    pos = next((i for i in idx if pat.match(lines[i]).group(2) > name), idx[-1] + 1)
    lines.insert(pos, link)
    print(f"{'would update' if dry_run else 'update':<14} README.md (+ {name})")
    if not dry_run:
        readme.write_text("\n".join(lines))


def main():
    default_out = Path(__file__).resolve().parent.parent
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("exam", help="exam abbreviation, e.g. LFCS")
    ap.add_argument("--url", help="exam page URL (needed for exams not in the built-in map)")
    ap.add_argument("--out", type=Path, default=default_out, help=f"parent directory (default: {default_out})")
    ap.add_argument("--force", action="store_true", help="overwrite existing files")
    ap.add_argument("--dry-run", action="store_true", help="print what would be written")
    args = ap.parse_args()

    abbr = args.exam.upper()
    url = args.url or (BASE + SLUGS[abbr] + "/" if abbr in SLUGS else None)
    if not url:
        sys.exit(f"unknown exam '{abbr}'; pass --url with its training.linuxfoundation.org page")

    try:
        page = fetch(url)
    except OSError as e:
        sys.exit(f"could not fetch {url}: {e}")
    title, domains = parse(page)
    if not domains:
        sys.exit(f"no 'Domains & Competencies' found at {url}")
    title = re.sub(r"\s*\(%s\)\s*$" % re.escape(abbr), "", title) or abbr
    for d in domains:
        d["dir"] = slugify(d["name"])

    root = args.out.expanduser() / abbr.lower()
    files = {
        root / "README.md": exam_readme(title, abbr, url, domains, True),
        root / "examinfo.yaml": examinfo(title, abbr, url, domains),
    }
    for d in domains:
        files[root / d["dir"] / "README.md"] = domain_readme(d)

    total = sum(d["weight"] for d in domains)
    if abs(total - 100) > 0.5:
        print(f"warning: domain weights sum to {total}, not 100", file=sys.stderr)

    for path, content in files.items():
        rel = path.relative_to(args.out.expanduser())
        if path.exists() and not args.force:
            print(f"skip (exists)  {rel}")
            continue
        print(f"{'would write' if args.dry_run else 'write':<14} {rel}")
        if not args.dry_run:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content)

    add_root_link(args.out.expanduser(), abbr.lower(), args.dry_run)


if __name__ == "__main__":
    main()
