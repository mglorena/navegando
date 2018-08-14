package Reporte;

use strict;
use warnings;
use PDF::API2;
use PDF::Table;
use GD::Graph::mixed;
use GD::Graph::Data;
use PDF::Reuse;
use utf8;

#PARA CAMBIAR LA RUTA DIRIGIRSE A LINEAS  38, 39, 141, 262,282,270, y de 480 a 486

sub creaReporte{
  my $datos = $_[0];


  my ($latitud,$longitud,$altitud,$capacidad,$inclinacion,$tipoMon,$eficiencia,$perdida,@genYcons)= split(/,/,$datos);
  
  my @generacion;
  my @consumo;
  for (my $i=0; $i<12;$i++){
    push @generacion, $genYcons[$i];
  }
  for (my $i=12; $i<24;$i++){
    push @consumo, $genYcons[$i];
  }

  #print Dumper @generacion, @consumo  ;
  #exit;  
  my $tipoMontaje;
  if ($tipoMon==3) {
    $tipoMontaje= "Roof Top";
  } else{
    $tipoMontaje= "Stand alone";
  }

  my $TEMPLATE = '/var/www/html/sisol/files/reportes/header.pdf';
  my $RESULT_PDF = '/var/www/html/sisol/files/reportes/1.pdf';

  my $pdf = PDF::API2->open($TEMPLATE);
  my $page    = $pdf->openpage('1');
  my $text    = $page->text();
  my $font    = $pdf->corefont('Times-Bold');
  $text->translate(213,660); 
  $text->font($font,12); 
  $text->text("Reporte de Generación Fotovoltaica");

  $text->translate(30,600);  #primero se mueve en la misma fila,distinta columna. Segundo mas cerca del 0 mas abajo en la hoja
  
  $text->text("Proyecto: Sistema Conectado a la Red");

  $text->translate(30,550);
  $text->text("Lugar Geográfico:");

  $text->translate(150,550);
  $text->text("Latitud");

  $text->translate(270,550);
  $text->text("Longitud");

  $text->translate(390,550);
  $text->text("Altitud");

  $text->translate(510,550);
  $text->text("Pais");

  $text->translate(30,500);  #primero se mueve en la misma fila,distinta columna. Segundo mas cerca del 0 mas abajo en la hoja
  $text->text("Huso horario:");

  $text->font($pdf->corefont('Times-Roman'),12); 
  $text->translate(150,525);
  $text->text($latitud);

  $text->translate(280,525);
  $text->text($longitud);

  $text->translate(395,525);
  $text->text($altitud);

  $text->translate(500,525);
  $text->text("Argentina");

  $text->translate(150,500);  #primero se mueve en la misma fila,distinta columna. Segundo mas cerca del 0 mas abajo en la hoja
  $text->text("UTC- 03:00");


  #---Parametros d eSimulacion---------
  $font    = $pdf->corefont('Times-Bold');
  $text->font($font,12); 
  $text->translate(30,450);  #primero se mueve en la misma fila,distinta columna. Segundo mas cerca del 0 mas abajo en la hoja
  $text->text("1. Parametros de la Simulación:");


  $text->translate(30,400);  
  $text->text("Capacidad a Instalar:");
  $text->translate(30,375);  
  $text->text("Orientación de los Paneles:");
  $text->translate(30,350);  
  $text->text("Necesidad de los usuarios:");
  $text->translate(30,325);  
  $text->text("Tipo de montaje:");
  $text->translate(30,300);  
  $text->text("Eficiencia del Inversor (%):");
  $text->translate(30,275);  
  $text->text("Factor de Perdida (%):");


  #respuestas 
  $font    = $pdf->corefont('Times-Roman');
  $text->font($font,12);
  $text->translate(200,375);  
  $text->text(" Inclinación = ".$inclinacion."°"); 
  $text->translate(400,375);  
  $text->text(" Azimut = 0°");
  $text->translate(200,400);

  $text->text($capacidad . "KW");
  $text->translate(200,350);  
  #$text->text(" Carga ilimitada a la red."); 
  $text->translate(200,325);  
  $text->text($tipoMontaje); 
  $text->translate(200,300);  
  $text->text($eficiencia. "%");
  $text->translate(200,275);  
  $text->text($perdida ."%");
  

$font = $pdf->corefont('Times-Roman');
$text->font($font,10);
 $text->translate(50,100); 
  $text->text("** Los resultados arrojados por el presente reporte, son estimativos, pudiendo en consecuencia, presentar variaciones");

 $text->translate(53,85); 
  $text->text("propias del sistema y los datos aportados.");
$pdf->saveas($RESULT_PDF);
  $pdf->end;

####TABLA

  my $pdftable = new PDF::Table;
   $pdf = new PDF::API2(-file => "/var/www/html/sisol/files/reportes/2.pdf");
   $page = $pdf->page;
   $text    = $page->text();
   $font    = $pdf->corefont('Times-Roman');

  $text->translate(30,450);  #primero se mueve en la misma fila,distinta columna. Segundo mas cerca del 0 mas abajo en la hoja
  $font = $pdf->corefont('Times-Roman');
  $text->font($font,10);
  $text->text("2. Consumo y Generación de energía mensual");
  $text->font($font,12);
  $text->translate(50,700);  
  $text->text("La siguiente tabla presenta un resumén mensual de la electricidad consumida y la generación electrica");
  $text->translate(50,680); 
  $text->text("producida por la instalaciónfotovoltaica. Ambos expresados en kWh:");

####creacion de tabla

 my $hdr_props = 
  {
          # This param could be a pdf core font or user specified TTF.
          #  See PDF::API2 FONT METHODS for more information
          font       => $pdf->corefont("Times", -encoding => "utf-8"),
          font_size  => 14,
          font_color => '#141313', # #006666
          bg_color   => 'white',
         repeat     => 1,    # 1/0 eq On/Off  if the header row should be repeated to every new       page
      };
my $some_data =[
["Mes",
"Consumo de energía eléctrica mensual [kWh]",
"Generación de energía eléctrica del sistema FV mensual [kWh]"],
["Enero",
"         $consumo[0]",
"         $generacion[0]"],
["Febrero",
"         $consumo[1]",
"         $generacion[1]"],
["Marzo",
"         $consumo[2]",
"         $generacion[2]"],
["Abril",
"         $consumo[3]",
"         $generacion[3]"],
["Mayo",
"         $consumo[4]",
"         $generacion[4]"],
["Junio",
"         $consumo[5]",
"         $generacion[5]"],
["Julio",
"         $consumo[6]",
"         $generacion[6]"],
["Agosto",
"         $consumo[7]",
"         $generacion[7]"],
["Septiembre",
"         $consumo[8]",
"         $generacion[8]"],
["Octubre",
"         $consumo[9]",
"         $generacion[9]"],
["Noviembre",
"         $consumo[10]",
"         $generacion[10]"],
["Diciembre",
"         $consumo[11]",
"         $generacion[11]"],
];


 my $left_edge_of_table = 50;
   # build the table layout
  $pdftable->table(
  
    $pdf,
    $page,
    $some_data,
    x => $left_edge_of_table,
    w => 495,
    start_y => 650,
    next_y  => 675,
    start_h => 300,
    next_h  => 500,
    # some optional params
     padding => 5,
     padding_right => 10,
     #background_color_odd  => shift @_ || "#FFFFFF",
     #background_color_even => shift @_ || "#FFFFFF", #cell background color for even rows
     header_props   => $hdr_props, # see section HEADER ROW PROPERTIES

   );

  ######creación del grafico
  my $data = GD::Graph::Data->new([
      ["E","F","M","A","M","J","J", "A", "S", "O", "N","D"],
      [    235,    132,    250,    236,    323,  235,    411,     233,     344, 256,126,217],
      [    180,    140,    134,    65,    80,  126,    74,     123,     234, 127,153,169],
  ]) or die GD::Graph::Data->error;
   
   
  my $graph = GD::Graph::mixed->new;
   
  $graph->set( types => ['bars','lines' ] );

  $graph->set( 
      x_label         => 'Meses',
      y_label         => 'KWh',
      interlaced    => 0,
      #title           => 'Producción vs Consumo',
   
      #y_max_value     => 12,
      #y_tick_number   => 12,
      #y_label_skip    => 3,
   
      #x_labels_vertical => 1,
   
      bar_spacing     => 2,
      #shadow_depth    => 4,
      shadowclr       => 'dred',
   
      transparent     => 0,
  ) or die $graph->error;
   
  $graph->plot($data) or die $graph->error;
   
  my $file = '/var/www/html/sisol/images/reportes/bar.png';
  open(my $out, '>', $file) or die "Cannot open '$file' for write: $!";
  binmode $out;
  print $out $graph->gd->png;
  close $out;

  ##################### GRAFICO DE BARRAS ########################

  my $png =("/var/www/html/sisol/images/reportes/bar.png");
  my $image = $pdf->image_png($png);
  #$page->mediabox(0,0,$image->width, $image->height);
  #$page->trimbox(0,0,$image->width, $image->height);
  my $gfx = $page->gfx;
  $gfx->image($image, 90, 10);

  $pdf->saveas();

##################################################

 $pdftable = new PDF::Table;
   $pdf = new PDF::API2(-file => "/var/www/html/sisol/files/reportes/3.pdf");
   $page = $pdf->page;
   $text    = $page->text();
   $font    = $pdf->corefont('Times-Bold');

  $text->font($font,12);
  $text->translate(110,700);  
  $text->text("Estimación de la generación de electricidad en el marco de la Ley 7.824");
  $text->translate(200,680); 
  $text->text("Decreto Reglamentario 448/17");
   $font    = $pdf->corefont('Times-Roman');

  $text->font($font,12);
  $text->translate(50,640); 
  $text->text("Ley 7.824: Esta ley tiene por objeto el establecimiento d elas condiciones administrativas, técnicas y");
  $text->translate(50,620); 
  $text->text("económicas para la aplicación de la modalidad de suministro de energía eléctrica con Balance Neto.");

 $hdr_props = 
  {
          # This param could be a pdf core font or user specified TTF.
          #  See PDF::API2 FONT METHODS for more information
          font       => $pdf->corefont("Times", -encoding => "utf-8"),
          font_size  => 14,
          font_color => '#141313', # #006666
          bg_color   => 'white',
         repeat     => 1,    # 1/0 eq On/Off  if the header row should be repeated to every new       page
      };

my $consumo= 1234;
my $generacion= 750;
my $balance= $consumo - $generacion;
$some_data =[
["Año",
"Energía generada (kWh)",
"Energía consumida (kWh)","Balance(kWh)"],
["1",
"         $generacion",
"         $consumo", "$balance"],
["2",
"         $generacion",
"         $consumo", "$balance"],
["3",
"         $generacion",
"         $consumo", "$balance"],
["4",
"         $generacion",
"         $consumo", "$balance"],
["5",
"         $generacion",
"         $consumo", "$balance"],
["6",
"         $generacion",
"         $consumo", "$balance"],
["7",
"         $generacion",
"         $consumo", "$balance"],
["8",
"         $generacion",
"         $consumo", "$balance"],
["9",
"         $generacion",
"         $consumo", "$balance"],
["10",
"         $generacion",
"         $consumo", "$balance"],
];


$left_edge_of_table = 50;

# build the table layout

$pdftable->table(
  
    $pdf,
    $page,
    $some_data,
    x => $left_edge_of_table,
    w => 495,
    start_y => 600,
    next_y  => 550,
    start_h => 300,
    next_h  => 500,
    # some optional params
     padding => 5,
     padding_right => 10,
     #background_color_odd  => shift @_ || "#FFFFFF",
     #background_color_even => shift @_ || "#FFFFFF", #cell background color for even rows
     header_props   => $hdr_props, # see section HEADER ROW PROPERTIES

  );

$font = $pdf->corefont('Times-Bold');
$text->font($font,12);
$text->translate(50,320); 
$text->text("Total de energía generada en 10 años (kWh):");
$text->translate(50,290);
$text->text("Total de energía consumida en 10 años (kWh):");
$text->translate(50,260);
$text->text("Balance de energía en 10 años (kWh):");
$text->font($font,12);
$font = $pdf->corefont('Times-Roman');
$text->font($font,12);
$text->translate(50,230);  
$text->text("En el marco del actual decreto reglamentario los dos (2) primeros años se otorga el beneficio de la tarifa");
$text->translate(50,210); 
$text->text("diferencial 100% de la energía generada, mientras que para los años siguientes (del tercer año en adelante)");
$text->translate(50,190);
$text->text("solo los excedentes de energía eléctrica generada se pagan a la tarifa diferencial.");
$text->translate(50,160);
$text->text("Estimación de la compensación monetaria por la energía generada y ahorro de energía:");


$pdf->saveas();

####################################################

$pdftable = new PDF::Table;
   $pdf = new PDF::API2(-file => "/var/www/html/sisol/files/reportes/4.pdf");
   $page = $pdf->page;
   $text    = $page->text();
   $font    = $pdf->corefont('Times-Roman');

$text->font($font,12);



$hdr_props = 
  {
          # This param could be a pdf core font or user specified TTF.
          #  See PDF::API2 FONT METHODS for more information
          font       => $pdf->corefont("Times", -encoding => "utf-8"),
          font_size  => 14,
          font_color => '#141313', # #006666
          bg_color   => 'white',
         repeat     => 1,    # 1/0 eq On/Off  if the header row should be repeated to every new       page
      };
$some_data =[
["Año",
"Pago por la Energía Generada (pesos)",
"Ahorro de Energía (kWh)", "Ahorro de Energía (pesos)"],
["1", "", "", ""],
["2", "", "", ""],
["3", "", "", ""],
["4", "", "", ""],
["5", "", "", ""],
["6", "", "", ""],
["7", "", "", ""],
["8", "", "", ""],
["9", "", "", ""],
["10", "", "", ""],
];

 $left_edge_of_table = 50;
   # build the table layout
  $pdftable->table(
  
    $pdf,
    $page,
    $some_data,
    x => $left_edge_of_table,
    w => 495,
    start_y => 700,
    next_y  => 650,
    start_h => 300,
    next_h  => 500,
    # some optional params
     padding => 5,
     padding_right => 10,
     #background_color_odd  => shift @_ || "#FFFFFF",
     #background_color_even => shift @_ || "#FFFFFF", #cell background color for even rows
     header_props   => $hdr_props, # see section HEADER ROW PROPERTIES

   );

$text->translate(50,380);
$text->text("Considerando el supuesto que el sistema de generación se encuentra 10 años conectado a la red bajo el actual");
$text->translate(50,360);
$text->text("esquema de consexión provincial, el mismo generará:");


$font = $pdf->corefont('Times-Bold');
$text->font($font,12);
$text->translate(50,300); 
$text->text("Total de energía generada en 10 años (kWh):");
$text->translate(50,270);
$text->text("Total de energía consumida en 10 años (kWh):");
$text->translate(50,240);
$text->text("Balance de energía en 10 años (kWh):");

   $pdf->saveas();





######3
  prFile("/var/www/html/sisol/files/reportes/reporte.pdf");
  prDoc("/var/www/html/sisol/files/reportes/1.pdf");
  #prDoc("2.pdf");
  prDoc("/var/www/html/sisol/files/reportes/2.pdf");
    prDoc("/var/www/html/sisol/files/reportes/3.pdf");
    prDoc("/var/www/html/sisol/files/reportes/4.pdf");
  prEnd();

  return 1;
}
1;