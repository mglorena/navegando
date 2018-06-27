#!/usr/local/ActivePerl-5.16/bin/perl -w

use strict;
use warnings;
use PDF::API2;
use PDF::Table;
use PDF::Reuse;
use utf8;

my $pdftable = new PDF::Table;
my $pdf = new PDF::API2(-file => "1.pdf");
my $page = $pdf->page;

my $hdr_props = 
{
        # This param could be a pdf core font or user specified TTF.
        #  See PDF::API2 FONT METHODS for more information
        font       => $pdf->corefont("Times", -encoding => "utf-16"),
        font_size  => 10,
        font_color => '#006666',
        bg_color   => 'light blue',
       repeat     => 1,    # 1/0 eq On/Off  if the header row should be repeated to every new       page
    };


# some data to layout
my $some_data =[
["Meses",
"Consumo Energético Mensual en kWh",
"Producción Energética Fotovoltaica en kWh"],
["Enero.",
"",
""],
["Febrero",
"",
""],
["Marzo",
"",
""],
["Abril",
"",
""],
#... and so on
];

  my $left_edge_of_table = 50;
   # build the table layout
  $pdftable->table(
    # required params
    $pdf,
    $page,
    $some_data,
    x => $left_edge_of_table,
    w => 495,
    start_y => 750,
    next_y  => 700,
    start_h => 300,
    next_h  => 500,
    # some optional params
     padding => 5,
     padding_right => 10,
     background_color_odd  => shift @_ || "#FFFFFF",
     background_color_even => shift @_ || "#FFFFCC", #cell background color for even rows
     header_props   => $hdr_props, # see section HEADER ROW PROPERTIES

   );

  $pdf->saveas();



# Open an existing PDF file
$pdf = new PDF::API2(-file => "2.pdf");
$page = $pdf->page;


# Add a built-in font to the PDF
my $font = $pdf->corefont('Helvetica-Bold');

# Add some text to the page
my $text = $page->text();
$text->font($font, 20);
$text->translate(200, 700);
$text->text('Hello World!');

  # Save the PDF
  $pdf->saveas();



prFile("report.pdf");

prDoc("2.pdf");
prDoc("1.pdf");

prEnd();