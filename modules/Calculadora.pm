#!/usr/bin/perl
#
# @File Calculadora.pm
# @Author root
# @Created Jul 27, 2017 6:21:24 PM
#

package Calculadora;

use Data::Dumper;

sub GetRadMensual{

#
my ($lat,$long) = @_;

system("cdo remapnn,lon=$long/lat=$lat /var/www/html/sayiri/data/mensual.nc /var/www/html/sayiri/data/salida.nc");

my $salida= system("cdo outputtab,value /var/www/html/sayiri/data/salida.nc");


my @radiacionMensual = split(/\n /, $salida);

return "hggooo";
 #return  Dumper $salida	;
}
1;