#!/usr/bin/perl
use CGI;
use Data::Dumper;
use LWP::UserAgent;
#use lib "./modules";
use Fotovoltaico;

###### Entrada de lore
      my @h_Mes= (181.15,158.77,156.77,122.22,104.32,94.21,110.57,134.15,155.97,164.30,173.21,183.65);
      my @consumoMensual=(4958,3962,4743,4448,5278,5439,7474,5685,4609,7836,4369,4239);
      my $latitud= -24.79;
      my $longitud= -69 ;
      my $modelo=3 ;#tipo de instalación
      my $PgfvAux=10; #potencia a instalar 5kWh
      my $beta=30;
      my $eficiencia= 0.97;
      my $perdida= 0.1;
#####   


#print Dumper Fotovoltaico::calculaEnergia($latitud,$longitud,$modelo,$PgfvAux,$beta,$eficiencia,$perdida,@h_Mes,@consumoMensual);
print Dumper Fotovoltaico::calculaEnergia($latitud,$longitud,$modelo,$PgfvAux,$beta,$eficiencia,$perdida,1,2,3,4,5,6,7,8,9,10,11,12,12,11,10,9,8,7,6,5,4,3,2,1);
#print Dumper Fotovoltaico::calculaEnergia($latitud,$longitud,@consumoMensual,@h_Mes,$PgfvAux,$modelo,30);