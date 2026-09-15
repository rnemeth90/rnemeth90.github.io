.section .text
.global _start

_start:
    # Move the value 10 into %eax
    movl $42, %eax

    # Copy the value from %eax to %ebx
    movl %eax, %ebx

    # Copy the value from %ebx to %ecx
    movl %ebx, %ecx

    # Exit the program
    movl $42, %eax      # Syscall: exit
    xorl %ebx, %ebx    # Exit code 0
    int $0x80          # Call kernel
