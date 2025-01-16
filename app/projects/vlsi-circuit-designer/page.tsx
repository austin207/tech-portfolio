import ProjectDetail from '@/app/components/ProjectDetail'

const languageData = [
  { name: 'Verilog', value: 180, color: '#2980b9' },
  { name: 'SystemVerilog', value: 150, color: '#8e44ad' },
  { name: 'C++', value: 120, color: '#f34b7d' },
  { name: 'Python', value: 90, color: '#3572A5' },
  { name: 'Tcl', value: 60, color: '#c3ba4e' },
  { name: 'Other', value: 40, color: '#ededed' }
]

const codeBlocks = [
  {
    name: 'Basic Logic Gate',
    language: 'verilog',
    code: `
module and_gate(
    input a,
    input b,
    output y
);

assign y = a & b;

endmodule

module testbench;
    reg a, b;
    wire y;

    and_gate uut(.a(a), .b(b), .y(y));

    initial begin
        $dumpfile("and_gate.vcd");
        $dumpvars(0, testbench);

        a = 0; b = 0; #10;
        a = 0; b = 1; #10;
        a = 1; b = 0; #10;
        a = 1; b = 1; #10;

        $finish;
    end

    initial
        $monitor("Time = %0t: a = %b, b = %b, y = %b", $time, a, b, y);
endmodule
    `.trim()
  },
  {
    name: 'Flip-Flop',
    language: 'verilog',
    code: `
module d_flip_flop(
    input clk,
    input reset,
    input d,
    output reg q
);

always @(posedge clk or posedge reset) begin
    if (reset)
        q <= 1'b0;
    else
        q <= d;
end

endmodule

module testbench;
    reg clk, reset, d;
    wire q;

    d_flip_flop uut(.clk(clk), .reset(reset), .d(d), .q(q));

    initial begin
        clk = 0;
        forever #5 clk = ~clk;
    end

    initial begin
        $dumpfile("d_flip_flop.vcd");
        $dumpvars(0, testbench);

        reset = 1; d = 0; #10;
        reset = 0; d = 1; #10;
        d = 0; #10;
        d = 1; #10;

        $finish;
    end

    initial
        $monitor("Time = %0t: reset = %b, d = %b, q = %b", $time, reset, d, q);
endmodule
    `.trim()
  },
  {
    name: 'Adder',
    language: 'verilog',
    code: `
module full_adder(
    input a,
    input b,
    input cin,
    output sum,
    output cout
);

assign sum = a ^ b ^ cin;
assign cout = (a & b) | (b & cin) | (a & cin);

endmodule

module ripple_carry_adder
#(parameter WIDTH = 4)
(
    input [WIDTH-1:0] a,
    input [WIDTH-1:0] b,
    input cin,
    output [WIDTH-1:0] sum,
    output cout
);

wire [WIDTH:0] carry;
assign carry[0] = cin;
assign cout = carry[WIDTH];

genvar i;
generate
    for (i = 0; i < WIDTH; i = i + 1) begin : fa_loop
        full_adder fa(
            .a(a[i]),
            .b(b[i]),
            .cin(carry[i]),
            .sum(sum[i]),
            .cout(carry[i+1])
        );
    end
endgenerate

endmodule

module testbench;
    parameter WIDTH = 4;
    reg [WIDTH-1:0] a, b;
    reg cin;
    wire [WIDTH-1:0] sum;
    wire cout;

    ripple_carry_adder #(WIDTH) uut(.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));

    initial begin
        $dumpfile("ripple_carry_adder.vcd");
        $dumpvars(0, testbench);

        a = 4'b0000; b = 4'b0000; cin = 0; #10;
        a = 4'b1010; b = 4'b0101; cin = 0; #10;
        a = 4'b1111; b = 4'b0001; cin = 0; #10;
        a = 4'b1111; b = 4'b0001; cin = 1; #10;

        $finish;
    end

    initial
        $monitor("Time = %0t: a = %b, b = %b, cin = %b, sum = %b, cout = %b", $time, a, b, cin, sum, cout);
endmodule
    `.trim()
  }
]

export default function VLSICircuitDesignerProject() {
  return (
    <ProjectDetail
      title="VLSI Circuit Designer"
      description="Custom VLSI circuit design and simulation tool"
      longDescription={`
The VLSI Circuit Designer is a sophisticated software tool developed to streamline the process of designing and simulating Very Large Scale Integration (VLSI) circuits. This project aims to provide engineers and researchers with a powerful, user-friendly platform for creating complex integrated circuits.

Key Features:
1. Intuitive GUI: A clean, intuitive graphical user interface that simplifies the circuit design process.
2. Component Library: Extensive library of pre-built components including logic gates, flip-flops, and more complex modules.
3. Custom Component Creation: Ability to create and save custom components for reuse in future designs.
4. Hierarchical Design: Support for hierarchical design, allowing for the creation of complex systems from simpler sub-circuits.
5. SPICE Integration: Built-in SPICE simulator for accurate circuit behavior prediction.
6. Verilog/VHDL Support: Import and export designs using industry-standard HDL formats.
7. Timing Analysis: Tools for static timing analysis to identify critical paths and timing violations.
8. Power Estimation: Integrated power estimation tools to optimize circuit energy efficiency.
9. DRC & LVS: Design Rule Checking (DRC) and Layout vs. Schematic (LVS) verification tools.
10. Multi-platform Support: Available for Windows, macOS, and Linux operating systems.

This VLSI Circuit Designer tool is ideal for educational purposes, research projects, and even professional VLSI design work. It bridges the gap between conceptual circuit design and physical implementation, providing a comprehensive solution for the entire VLSI design workflow.

The project showcases advanced software engineering principles and domain-specific knowledge in electrical engineering, making it a valuable addition to any tech portfolio.
    `}
      tags={['VLSI', 'Verilog', 'SystemVerilog', 'Circuit Design', 'Simulation', 'EDA']}
      image="/placeholder.svg?height=300&width=600"
      circuitDiagram="/placeholder.svg?height=400&width=800"
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      languageData={languageData}
      codeBlocks={codeBlocks}
    />
  )
}

