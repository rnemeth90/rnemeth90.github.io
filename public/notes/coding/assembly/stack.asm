.section .text
.global _start

_start:
    # Push values onto the stack
    pushl $10           # Push 10 onto the stack
    pushl $20           # Push 20 onto the stack

    # Access the stack
    movl (%esp), %eax   # Load the top of the stack (20) into %eax
    addl 4(%esp), %eax  # Add the second value on the stack (10) to %eax

    # Clean up the stack
    addl $8, %esp       # Adjust %esp to remove the two values

    # Exit
    movl $1, %eax       # Syscall: exit
    xorl %ebx, %ebx     # Exit code: 0
    int $0x80           # call the kernel
