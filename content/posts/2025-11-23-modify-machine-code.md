---
title: "Modify Machine Code in Executables"
date: '2025-11-23T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
- Programming
- Systems
- Assembly
- Reverse Engineering
---

# Modifying Machine Code in Executables

In this post, we’ll walk through a simple but fun reverse-engineering exercise: taking a compiled C program, locating the machine instructions responsible for printing characters, and modifying those bytes directly in the executable.

This is a great way to build intuition around how compilers translate code, how functions map to assembly, and how tools like `objdump` and `xxd` help us inspect and patch binaries.

---

## The Source Program

We’ll start with a minimal C program that prints `"ab\n"`:

```c
#include <stdio.h>

int main() {
  putchar('a');
  putchar('b');
  putchar('\n');

  return 0;
}
```

Compile it normally:

```bash
gcc -o main main.c
```

---

## Inspecting the Binary with `objdump`

Let’s look at the generated machine code:

```bash
objdump -d main
```

This produces a lot of output (as expected), but the portion we care about is the `main` symbol. We can isolate it:

```bash
objdump --disassemble=main -f main
```

The disassembly for `main` looks like this:

```bash
0000000000001139 <main>:
    1139:       55                      push   %rbp
    113a:       48 89 e5                mov    %rsp,%rbp
    113d:       bf 61 00 00 00          mov    $0x61,%edi
    1142:       e8 e9 fe ff ff          call   1030 <putchar@plt>
    1147:       bf 62 00 00 00          mov    $0x62,%edi
    114c:       e8 df fe ff ff          call   1030 <putchar@plt>
    1151:       bf 0a 00 00 00          mov    $0x0a,%edi
    1156:       e8 d5 fe ff ff          call   1030 <putchar@plt>
    115b:       b8 00 00 00 00          mov    $0x0,%eax
    1160:       5d                      pop    %rbp
    1161:       c3                      ret
```

Each call to `putchar` is preceded by a `mov $VALUE, %edi`, where `%edi` contains the character to print.

- `0x61` > `'a'`
- `0x62` > `'b'`
- `0x0a` > newline

If we want the program to print `"ac"` instead of `"ab"`, we need to modify the instruction at `0x1147` so that it loads `0x63` (ASCII `'c'`) instead of `0x62`.

---

## Producing a Hex Dump

To patch the executable, we’ll create a hex dump:

```bash
xxd main > main.asm
```

Here’s the relevant portion (trimmed for clarity):

```bash
00001140: 0000 e8e9 feff ffbf 6200 0000 e8df feff  ........b....... < HERE
```

The byte at address `0x1147` falls 14 bytes (`0xE`) into this block.  
That `62` is the value we want to change.

We want this:

```bash
00001140: 0000 e8e9 feff ffbf 6300 0000 e8df feff  ........c.......
```

Notice that only **one byte** changes: `0x62` > `0x63`.

---

## Writing the Modified Binary Back

Save the modified hex dump, then run:

```bash
xxd -r main.asm modified_main
```

Now run it:

```bash
./modified_main
ac
```

Success. We changed the program’s behavior **without recompiling**, simply by patching the machine code. This is the foundation for advanced topics like reverse engineering, binary instrumentation, and exploit development. If you'd like to extend this example, such as patching instructions of different sizes, modifying control flow, or injecting new code, let me know. I’m happy to build on this.

