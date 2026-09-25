#!/usr/bin/env python3
import re

with open("SUMMARY.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

fixed = []
for line in lines:
    stripped = line.strip()

    # Preserve blank lines exactly
    if stripped == "":
        fixed.append("\n")
        continue

    # Replace "-" with "*"
    line = re.sub(r"^\s*-\s", lambda m: " " * (len(m.group(0)) - 2) + "* ", line)

    # Normalize "* " indentation to multiples of 4 spaces
    m = re.match(r"^(\s*)\*\s", line)
    if m:
        indent = len(m.group(1))
        normalized = " " * (indent // 4 * 4)
        # Replace indent but keep the rest of the line intact
        line = normalized + line.lstrip()

    # Ensure there is exactly one newline at the end of each list item
    if not line.endswith("\n"):
        line += "\n"

    fixed.append(line)

# Write clean output
with open("SUMMARY_FIXED.md", "w", encoding="utf-8") as f:
    f.writelines(fixed)

print("Wrote SUMMARY_FIXED.md — review and then replace SUMMARY.md")
