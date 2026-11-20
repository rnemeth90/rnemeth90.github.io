#!/usr/bin/env python3
"""
Generate mkdocs.yml nav section and GitBook SUMMARY.md from markdown files.
"""
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any

def extract_title(file_path: Path) -> str:
    """Extract title from markdown file's first # heading."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('# '):
                    return line[2:].strip()
                elif line.startswith('#'):
                    # Handle cases like "## Title" - take first heading regardless of level
                    title = re.sub(r'^#+\s*', '', line).strip()
                    if title:
                        return title
        # Fallback: derive from filename
        return clean_filename(file_path.stem)
    except Exception as e:
        print(f"Warning: Could not read {file_path}: {e}", file=os.sys.stderr)
        return clean_filename(file_path.stem)

def clean_filename(name: str) -> str:
    """Clean filename: strip .md, numbers, underscores."""
    # Remove .md extension if present
    name = name.replace('.md', '')
    # Remove leading numbers and dashes (e.g., "01-intro" -> "intro")
    name = re.sub(r'^\d+[-_]?', '', name)
    # Replace underscores with spaces
    name = name.replace('_', ' ')
    # Title case
    words = name.split()
    return ' '.join(word.capitalize() for word in words)

def get_sort_key(name: str) -> Tuple[int, str]:
    """Generate sort key: (numeric_prefix, name) for proper sorting."""
    match = re.match(r'^(\d+)[-_]', name)
    if match:
        return (int(match.group(1)), name.lower())
    return (999999, name.lower())  # Non-numeric goes after numeric

def sort_items(items: List, key_func=lambda x: x) -> List:
    """Sort items: numeric prefixes first, then alphabetical."""
    return sorted(items, key=lambda x: get_sort_key(key_func(x)))

class NavNode:
    """Represents a node in the navigation tree."""
    def __init__(self, name: str, is_dir: bool = False):
        self.name = name
        self.is_dir = is_dir
        self.files: List[Dict] = []
        self.subdirs: Dict[str, 'NavNode'] = {}
        self.readme: Optional[Dict] = None

def build_nav_tree(root: Path) -> NavNode:
    """Build hierarchical navigation tree from markdown files."""
    root_node = NavNode('', is_dir=True)
    
    # Find all markdown files
    for md_file in root.rglob('*.md'):
        # Skip if in hidden directories
        if any(part.startswith('.') for part in md_file.parts):
            continue
        
        rel_path = md_file.relative_to(root)
        parts = rel_path.parts
        
        # Navigate/create tree structure
        current = root_node
        for part in parts[:-1]:  # All parts except filename
            if part not in current.subdirs:
                current.subdirs[part] = NavNode(part, is_dir=True)
            current = current.subdirs[part]
        
        # Add file to current node
        filename = parts[-1]
        title = extract_title(md_file)
        file_entry = {
            'path': str(rel_path),
            'title': title,
            'filename': filename
        }
        
        if filename.lower() == 'readme.md':
            current.readme = file_entry
        else:
            current.files.append(file_entry)
    
    return root_node

def sort_items(items: List, key_func=lambda x: x) -> List:
    """Sort items: numeric prefixes first, then alphabetical."""
    return sorted(items, key=lambda x: get_sort_key(key_func(x)))

def build_mkdocs_nav(node: NavNode, root_path: str = '') -> List:
    """Build mkdocs nav structure recursively."""
    nav = []
    
    # Sort files
    sorted_files = sort_items(node.files, key_func=lambda x: x['filename'])
    
    # Sort subdirectories
    sorted_dirs = sort_items(list(node.subdirs.items()), key_func=lambda x: x[0])
    
    # Add non-README files
    for file_entry in sorted_files:
        nav.append({file_entry['title']: file_entry['path']})
    
    # Add subdirectories
    for dir_name, dir_node in sorted_dirs:
        sub_nav = build_mkdocs_nav(dir_node, os.path.join(root_path, dir_name))
        
        if dir_node.readme:
            # Use README as landing page
            dir_entry = {dir_node.readme['title']: [dir_node.readme['path']]}
            if sub_nav:
                dir_entry[dir_node.readme['title']].extend(sub_nav)
            nav.append(dir_entry)
        elif sub_nav:
            # Use directory name as section
            clean_dir_name = clean_filename(dir_name)
            nav.append({clean_dir_name: sub_nav})
        # If no files and no README, skip empty directories
    
    # Add README at root level if exists
    if node.readme and root_path == '':
        nav.insert(0, {node.readme['title']: node.readme['path']})
    
    return nav

def build_gitbook_summary(node: NavNode, root_path: str = '', indent: int = 0) -> List[str]:
    """Build GitBook SUMMARY.md structure recursively (mdbook-compatible)."""
    lines = []
    indent_str = '  ' * indent
    
    # Sort files
    sorted_files = sort_items(node.files, key_func=lambda x: x['filename'])
    
    # Sort subdirectories
    sorted_dirs = sort_items(list(node.subdirs.items()), key_func=lambda x: x[0])
    
    # Add README at root level if exists
    if node.readme and root_path == '':
        lines.append(f"{indent_str}- [{node.readme['title']}]({node.readme['path']})")
    
    # Add non-README files
    for file_entry in sorted_files:
        lines.append(f"{indent_str}- [{file_entry['title']}]({file_entry['path']})")
    
    # Add subdirectories
    for dir_name, dir_node in sorted_dirs:
        sub_lines = build_gitbook_summary(dir_node, os.path.join(root_path, dir_name), indent + 1)
        
        if dir_node.readme:
            # Use README as section header
            lines.append(f"{indent_str}- [{dir_node.readme['title']}]({dir_node.readme['path']})")
            lines.extend(sub_lines)
        elif sub_lines:
            # For mdbook compatibility: flatten directories without READMEs
            # Add their files directly without a directory header
            lines.extend(sub_lines)
    
    return lines

def format_yaml_value(value: Any, indent: int = 0) -> str:
    """Format a YAML value with proper indentation."""
    indent_str = '  ' * indent
    
    if isinstance(value, dict):
        if len(value) == 0:
            return '{}'
        lines = []
        for k, v in value.items():
            if isinstance(v, list):
                lines.append(f"{indent_str}- {k}:")
                for item in v:
                    if isinstance(item, dict):
                        lines.append(format_yaml_value(item, indent + 1))
                    else:
                        lines.append(f"{indent_str}  - {item}")
            elif isinstance(v, dict):
                lines.append(f"{indent_str}- {k}:")
                lines.append(format_yaml_value(v, indent + 1))
            else:
                lines.append(f"{indent_str}- {k}: {v}")
        return '\n'.join(lines)
    elif isinstance(value, list):
        if len(value) == 0:
            return '[]'
        lines = []
        for item in value:
            if isinstance(item, dict):
                lines.append(format_yaml_value(item, indent))
            else:
                lines.append(f"{indent_str}- {item}")
        return '\n'.join(lines)
    else:
        return f"{indent_str}{value}"

def format_mkdocs_nav(nav: List, indent: int = 0) -> List[str]:
    """Format mkdocs nav structure as YAML."""
    lines = []
    indent_str = '  ' * indent
    
    for item in nav:
        if isinstance(item, dict):
            for key, value in item.items():
                if isinstance(value, list):
                    # List of items (can be strings or dicts)
                    lines.append(f"{indent_str}- {key}:")
                    for sub_item in value:
                        if isinstance(sub_item, dict):
                            # Nested dict in list
                            for sub_key, sub_value in sub_item.items():
                                if isinstance(sub_value, list):
                                    sub_lines = format_mkdocs_nav([{sub_key: sub_value}], indent + 1)
                                    lines.extend(sub_lines)
                                elif isinstance(sub_value, dict):
                                    lines.append(f"{indent_str}  - {sub_key}:")
                                    sub_lines = format_mkdocs_nav([sub_value], indent + 2)
                                    lines.extend(sub_lines)
                                else:
                                    lines.append(f"{indent_str}  - {sub_key}: {sub_value}")
                        else:
                            # String in list
                            lines.append(f"{indent_str}  - {sub_item}")
                elif isinstance(value, dict):
                    # Single nested dict
                    lines.append(f"{indent_str}- {key}:")
                    sub_lines = format_mkdocs_nav([value], indent + 1)
                    lines.extend(sub_lines)
                else:
                    # Simple string value
                    lines.append(f"{indent_str}- {key}: {value}")
        else:
            lines.append(f"{indent_str}- {item}")
    
    return lines

def main():
    root = Path(__file__).parent
    nav_tree = build_nav_tree(root)
    
    # Build mkdocs nav
    mkdocs_nav = build_mkdocs_nav(nav_tree)
    
    # Build GitBook summary
    summary_lines = build_gitbook_summary(nav_tree)
    
    # Output mkdocs.yml nav section
    print("```yaml")
    print("nav:")
    nav_lines = format_mkdocs_nav(mkdocs_nav, indent=0)
    for line in nav_lines:
        print(line)
    print("```")
    
    print("\n")
    
    # Output GitBook SUMMARY.md
    print("```markdown")
    print("# Summary\n")
    for line in summary_lines:
        print(line)
    print("```")

if __name__ == '__main__':
    main()
