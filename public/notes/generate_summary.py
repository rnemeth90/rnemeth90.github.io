#!/usr/bin/env python3
"""Generate SUMMARY.md for mdbook by walking the filesystem."""

import os
import re

# Directories to skip entirely
SKIP_DIRS = {".git", ".github", "theme", "book", "__pycache__", "images", "node_modules"}

# Top-level categories (directory name -> display title) in desired order
TOP_LEVEL = [
    ("cheatsheets", "Cheatsheets"),
    ("clouds", "Clouds"),
    ("coding", "Coding"),
    ("compsci", "Computer Science"),
    ("databases", "Databases"),
    ("devops", "DevOps"),
    ("electronics", "Electronics"),
    ("fun", "Fun"),
    ("infosec", "InfoSec"),
    ("kubernetes", "Kubernetes"),
    ("networking", "Networking"),
    ("redis", "Redis"),
    ("systems", "Systems"),
    ("tools", "Tools"),
    ("troubleshooting", "Troubleshooting"),
    ("what-happens-when", "What Happens When..."),
]

TOP_LEVEL_NAMES = {name for name, _ in TOP_LEVEL}
TOP_LEVEL_TITLES = dict(TOP_LEVEL)


def extract_title(filepath):
    """Try to extract the first markdown heading from a file."""
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                line = line.strip()
                m = re.match(r"^#{1,2}\s+(.+)", line)
                if m:
                    return m.group(1).strip()
    except OSError:
        pass
    return None


def title_from_filename(filename):
    """Generate a title from a filename."""
    return filename.replace(".md", "").replace("_", " ").replace("-", " ").title()


def get_dir_title(dirname):
    """Get the display title for a directory."""
    return TOP_LEVEL_TITLES.get(dirname, title_from_filename(dirname))


def render_dir(dirpath, depth=0):
    """Render a directory as mdbook SUMMARY lines.

    Returns a list of strings (lines without trailing newlines).
    """
    indent = "  " * depth
    out = []
    dirname = os.path.basename(dirpath)

    # Gather markdown files and subdirectories
    try:
        entries = sorted(os.listdir(dirpath))
    except OSError:
        return out

    md_files = []
    subdirs = []
    readme_file = None

    for entry in entries:
        full = os.path.join(dirpath, entry)
        if os.path.isfile(full) and entry.lower().endswith(".md"):
            if entry.lower() == "readme.md":
                readme_file = entry
            else:
                md_files.append(entry)
        elif os.path.isdir(full) and entry not in SKIP_DIRS:
            subdirs.append(entry)

    # Determine the link target for this directory's header
    if readme_file:
        link_target = f"{dirpath}/{readme_file}"
    elif md_files:
        # Use the first markdown file as fallback link target
        link_target = f"{dirpath}/{md_files[0]}"
    else:
        link_target = None

    title = get_dir_title(dirname)

    if link_target:
        out.append(f"{indent}- [{title}]({link_target})")
    else:
        # No markdown files at all; only valid at top level (draft chapter)
        # For nested items, skip this directory header to avoid mdbook errors
        if depth > 0:
            # Just render children without a parent header
            for sd in subdirs:
                out.extend(render_dir(os.path.join(dirpath, sd), depth))
            return out
        out.append(f"{indent}- {title}")

    # Render child markdown files
    child_indent = "  " * (depth + 1)
    # If we used the first md file as fallback link, skip it in the children list
    skip_file = md_files[0] if (not readme_file and md_files and link_target) else None

    for md in md_files:
        if md == skip_file:
            continue
        filepath = f"{dirpath}/{md}"
        file_title = extract_title(filepath) or title_from_filename(md)
        out.append(f"{child_indent}- [{file_title}]({filepath})")

    # Render subdirectories
    for sd in subdirs:
        out.extend(render_dir(os.path.join(dirpath, sd), depth + 1))

    return out


def main():
    lines = [
        "# Summary",
        "",
        "These are my notes, there are many like them, but these ones are mine.",
        "",
    ]

    for dirname, _ in TOP_LEVEL:
        if os.path.isdir(dirname):
            lines.extend(render_dir(dirname, depth=0))

    with open("SUMMARY.md", "w") as f:
        f.write("\n".join(lines) + "\n")

    print("Generated SUMMARY.md")


if __name__ == "__main__":
    main()

