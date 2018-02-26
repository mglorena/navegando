#!/usr/bin/perl
#
# @File Calculadora.pm
# @Author root
# @Created Jul 27, 2017 6:21:24 PM
#

package Calculadora;

use Data::Dumper;
use CGI;
use Data::Dumper;
use LWP::UserAgent;
use Parse::RecDescent;
use Regexp::Grammars; 
use JSON::XS qw(encode_json decode_json);
use File::Slurp qw(read_file write_file);




sub GetRadiacion{
	my ($lat,$long) = @_;

	if (isInSalta($lat,$long))
	{

 		my $ua = LWP::UserAgent->new;

# #my $req = HTTP::Request->new(GET => 'http://192.168.1.6:8080/geoserver/datos/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=datos%3Ameses&STYLES&LAYERS=datos%3Ameses&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=-64.31396%2C-25.82611%2C-64.31296%2C-25.81611');
 		my @boundingBox = boundingBox($lat,$long);

 		my $url= "http://localhost:8080/geoserver/datos/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=datos%3Ameses&STYLES&LAYERS=datos%3Ameses&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=".$boundingBox[0]."%2C".$boundingBox[3]."%2C".$boundingBox[2]."%2C".$boundingBox[1];
 		
 		my $req= HTTP::Request->new(GET => $url);

 		my $res = $ua->request($req);
	     
 		if ($res->is_success)  {	
 			return Calculadora::parser($res->as_string); 
 		} 
 		else 
 		{
 			return "Failed: ", $res->status_line, "\n";
 		}
 		#&isInSalta(-25.809781975840405,-65.56503295898438);
 		#print Dumper &boundingBox(-25.809781975840405,-65.56503295898438);
 		#&parser($res->as_string); 
 		return "no paso nada";
	} 
	else 
	{ 
		return "error";
	}
}

sub parser{
	my ($sentence)= @_;

	$parser = qr{
        <Block>

        <rule: Block> 	<[cadena]>+


        <rule: cadena>  \"<mes>\"\: <numeros>\,|\"<mes>\"\: <numeros>\}

        <rule: mes>      Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre

        <rule: numeros>      [.0-9]+   


    }xms ;

		$sentence =~ s/$parser//;
		my %radiacion;
		foreach my $val (values %/{Block}->{cadena}) { 
			$radiacion{$val->{'mes'}} .=$val->{'numeros'};
		}
		
		my $json= encode_json \%radiacion;

		#write_file('radiacionMensual.json', { binmode => ':raw' }, $json);
		return $json;
	}

sub isInSalta{
	my ($lat,$long)= @_;
	my $westLimit= -68.5821533203125;
	my $eastLimit= -62.33299255371094;
	my $northLimit= -21.993988560906036;
	my $southLimit= -26.394945029678645;
	if ($westLimit<$long && $long<$eastLimit && $lat >$southLimit && $lat< $northLimit ){
		return "true";

		} else{
			return "false";
		}	
	}
	sub boundingBox{
		my ($lat,$long)= @_;
		my $westLimit= $long;
		my $eastLimit= $long +0.001;
		my $northLimit= $lat;
		my $southLimit= $lat+ 0.001;
		return ($westLimit,$southLimit,$eastLimit,$northLimit);

	}



	1;