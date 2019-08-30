#!/usr/bin/perl
use CGI;

use Data::Dumper;
use LWP::UserAgent;
#use lib "./modules";
use Fotovoltaico;

###### Entrada de lore
      #my @h_Mes= (181.15,158,77,156.77,122.22,104.32,94.21,110.57,134.15,155.97,164.30,173.21,183.65);
      my @h_Mes= (190.366,143.18,134.256,101.994,90.8762,88.1675,107.545,137.672,154.892,172.964,176.968,196.324);
      my @consumoMensual=(4958,3962,4743,4448,5278,5439,7474,5685,4609,7836,369,4239);
      my $latitud= "-24.79";
      my $longitud= -65.42 ;
      my $modelo=4 ;#tipo de instalación
      my $PgfvAux="100"; #potencia a instalar 5kWh
      my $beta=30;
      my $eficiencia= 98;
      my $perdida= 20;
      my $reporte=1;
      my $conexion=0; # 0 si no esta conectado
      my $altitud= 413;
      my $tipoUsuario="4";
#####   

#tipo de montaje 1 es roof top 
my $data= "$latitud,$longitud,$altitud,$conexion,$modelo,$PgfvAux,$beta,$eficiencia,$perdida,$reporte,$tipoUsuario,"."184.53,162.83,153.86,122.05,103.53,93.46,109.87,134.79,156.03,163.92,172.58,189.75,168,168,139,328,148,217,331,250,228,197,174,169,142"; 
#my $data= "$latitud,$longitud,$altitud,$conexion,$modelo,$PgfvAux,$beta,$eficiencia,$perdida,$reporte,$tipoUsuario,"."184.53,162.83,153.86,122.05,103.53,93.46,109.87,134.79,156.03,163.92,172.58,189.75,0,0,0,0,0,0,0,0,0,0,0,0"; 


 print Dumper Fotovoltaico::calculaEnergia($data);
