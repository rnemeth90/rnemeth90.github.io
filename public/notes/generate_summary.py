#!/usr/bin/env python3
import json, os

TREE_FILE = "tree.json"

# Top-level categories using Option A
TOP_LEVEL = {
    "cheatsheets": "Cheatsheets",
    "clouds": "Clouds",
    "coding": "Coding",
    "compsci": "Computer Science",
    "devops": "DevOps",
    "kubernetes": "Kubernetes",
    "networking": "Networking",
    "redis": "Redis",
    "systems": "Systems",
    "tools": "Tools",
    "troubleshooting": "Troubleshooting",
    "what-happens-when": "What Happens When",
}

# Render a list of files and subdirectories
def render_dir(name, contents, path=""):
    out = []
    this_path = os.path.join(path, name) if path else name

    # add README if present
    readme = [f for f in contents if f["type"] == "file" and f["name"].lower() == "readme.md"]
    if readme:
        out.append(f"* [{TOP_LEVEL.get(name, name).title()}]({this_path}/README.md)")
    else:
        out.append(f"* {TOP_LEVEL.get(name, name).title()}")

    # children
    for item in contents:
        if item["type"] == "file" and item["name"].endswith(".md") and item["name"].lower() != "readme.md":
            child_path = f"{this_path}/{item['name']}"
            title = item["name"].replace(".md", "").replace("_", " ").replace("-", " ").title()
            out.append(f"    * [{title}]({child_path})")

        if item["type"] == "directory":
            out.extend(
                ["    " + line for line in render_dir(item["name"], item["contents"], this_path)]
            )

    return out


def main():
    tree = json.load(open(TREE_FILE))
    root_contents = tree[0]["contents"]

    # header
    lines = [
        "# Summary\n",
        "\n",
        "These are my notes, there are many like them, but these ones are mine.\n",
        "\n"
    ]

    # process top-level dirs
    for item in root_contents:
        if item["type"] == "directory" and item["name"] in TOP_LEVEL:
            lines.extend(render_dir(item["name"], item["contents"]))

            lines.append("\n---\n")

    open("SUMMARY.md", "w").write("\n".join(lines))

    print("Generated SUMMARY.md")


if __name__ == "__main__":
    main()

