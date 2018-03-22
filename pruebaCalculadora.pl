#!/usr/bin/perl
use CGI;
use Data::Dumper;
use LWP::UserAgent;
use lib "./modules";
use Calculadora;


my @salida=Calculadora::GetRadiacion(-22.9735,-63.023);

print Dumper @salida;
#-22.97356659115514----63.0230712890625