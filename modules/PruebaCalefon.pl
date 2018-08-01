#!/usr/bin/perl
use CGI;
use Data::Dumper;
use LWP::UserAgent;
use lib "./modules";
use Calefon;


###### Entrada de lore
      my @h_Mes= (181.15,158,77,156.77,122.22,104.32,94.21,110.57,134.15,155.97,164.30,173.21,183.65);
     # my @consumoMensual=(4958,3962,4743,4448,5278,5439,7474,5685,4609,7836,369,4239);
      my $latitud= "-24.79";
      my $longitud= -65.42 ;
      my $tipoColector=1 ;#tipo de instalación
      my $Tmedia= 30;
      my $cantPersonas= 10;
#####   

my $data= "$latitud,$cantPersonas,$tipoColector,"."184.53,162.83,153.86,122.05,103.53,93.46,109.87,134.79,156.03,163.92,172.58,189.75,24,23,22.3,25,18,20,25,22.8,19.7,17.4,16.9,14.2"; 


Calefon::calculaFraccion($data);
