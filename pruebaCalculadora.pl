#!/usr/bin/perl
use CGI;
use Data::Dumper;
use LWP::UserAgent;
use lib "./modules";
use Calculadora;


my @salida=Calculadora::GetRadiacion(-22.9735,-63.023,"mdiciembre");


#($mes, $beta, $latitud, $H)
#entrego mes, 
# devuelvo inclinada, componentes directa y difusa
#print Dumper Calculadora::radiacionDiaInclinada("enero",30,-22.9735,6.04);

#print "\n \n  \n \n \n \n \n \n \n \n ";

print Dumper @salida;

#print "\n \n  \n \n \n \n \n \n \n \n ";


#print "hola \n";
#print Dumper Calculadora::componentesMes("enero",-22.9735,187.04);

#print "\n \n  \n \n \n \n \n \n \n \n ";

#print Dumper Calculadora::componentesDia("enero",-22.9735,7.04);


#-22.97356659115514----63.0230712890625;


#($mes, $beta, $latitud, $Hmes)