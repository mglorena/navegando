#!/usr/bin/perl
#
# @File Calculadora.pm
# @Author root
# @Created Jul 27, 2017 6:21:24 PM
#

#Modulo que inclina la radiacion recibida
# Duffie and Beckman 104, capitulo 2.19: Average Radiation on Sloped Surfaces: Isotropi Sky edicion Judith 
# Dia caracteristico
# parametros de entrada: latitud, la radiacion mensual dividida por la cantidad de dias, día juliano, beta inclinación del panel
# azimut considerado 180, es decir mirando al norte
#package Radiacion;


package Calculadora;

use Math::Trig;
use Data::Dumper;
use CGI;
use Data::Dumper;
use LWP::UserAgent;
use Parse::RecDescent;
use Regexp::Grammars; 
use JSON::XS qw(encode_json decode_json);
use File::Slurp qw(read_file write_file);


# $type={d,m,a} y $mes= "Enero" "Febrero" "Marzo"
# devolver un vector con cuatro posiciones= (radiacion, inclinada, etc..)
sub GetRadiacion{
	my ($lat,$long,$type,$mes) = @_;
	# print $lat;
	# print "\n";
	# print $long;
	# print "\n";
	# exit;
	if (isInSalta($lat,$long))
	{

 		my $ua = LWP::UserAgent->new;

# #my $req = HTTP::Request->new(GET => 'http://192.168.1.6:8080/geoserver/datos/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=datos%3Ameses&STYLES&LAYERS=datos%3Ameses&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=-64.31396%2C-25.82611%2C-64.31296%2C-25.81611');
 		my @boundingBox = boundingBox($lat,$long);
 		#print Dumper @boundingBox;
 		#exit;
 		my $url= "http://localhost:8080/geoserver/datos/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=datos%3Adatos&STYLES&LAYERS=datos%3Adatos&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=".$boundingBox[0]."%2C".$boundingBox[3]."%2C".$boundingBox[2]."%2C".$boundingBox[1];
 		#print $url;
 		#exit;
 		my $req= HTTP::Request->new(GET => $url);
 		
 		my $res = $ua->request($req);
 		#print $res->as_string;
 		#exit;
 		#my $nada="{"type":"FeatureCollection","totalFeatures":"unknown","features":[{"type":"Feature","id":"datos.1413","geometry":{"type":"MultiPolygon","coordinates":[[[[-63.04257746,-22.95447873],[-63.00064819,-22.95447873],[-63.00064819,-22.99647618],[-63.04257746,-22.99647618],[-63.04257746,-22.95447873]]]]},"geometry_name":"the_geom","properties":{"Latitud":-63.04,"Longitud":-23,"Unidades":"kWh / m^2","Enero":5.83,"Febrero":6.78,"Marzo":5.34,"Abril":4.1,"Mayo":2.88,"Junio":2.59,"Julio":2.66,"Agosto":3.86,"Setiembre":5.5,"Octubre":6.04,"Noviembre":6.68,"Diciembre":7.53,"mesEnero":187.87,"mesFebrero":168.87,"mesMarzo":158.92,"mesAbril":123.08,"mesMayo":99.95,"mesJunio":79.23,"mesJulio":103.92,"mesAgosto":130.63,"mesSetiemb":152.37,"mesOctubre":161.6,"mesNoviemb":165.95,"mesDiciemb":177.73,"mesAnual":1710.14}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}";
	     
 		if ($res->is_success)  {	
 			#print Dumper parser($res->as_string);
 			#print "\n \n \n";
 			#print Dumper parserMes($res->as_string);
 			my @retorno= parser($res->as_string); 
 			return @retorno; 
 			
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

	my @parser1= parserDia($sentence);

	return @parser1;
	#my $parser2= parserMes($sentence);

	#my @parser=($parser1,$parser2);

	#return @parser;

}

sub parserDia{
	my ($sentence)= @_;

	$parser = qr{
        <Block>

        <rule: Block> 	<[cadena]>+


        <rule: cadena>  \"<mes>\"\: <numeros>\,|\"mesEnero\"\:

        <rule: mes>      Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Setiembre|Octubre|Noviembre|Diciembre

        <rule: numeros>      [.0-9]+   


    }xms ;


		$sentence =~ s/$parser//;
		#my %radiacion;
		my @radiacionDia;
		foreach my $val (values %/{Block}->{cadena}) { 
			$radiacion{$val->{'mes'}} .=$val->{'numeros'};
			push @radiacionDia, $val->{'numeros'};
		}
		pop @radiacionDia;
		my $jsonDia= encode_json \%radiacion;

		#return $jsonDia;
		return @radiacionDia;
	}

sub parserMes{
	my ($sentence)= @_;

	$parser = qr{
        <Block>

        <rule: Block> 	<[cadena]>+

        <rule: cadena>  \"mes<mes>\"\: <numeros>\,|\"mes<mes>\"\: <numeros>\}

        <rule: mes>      Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Setiemb|Octubre|Noviemb|Diciemb|Anual

        <rule: numeros>      [.0-9]+   


    }xms ;

		$sentence =~ s/$parser//;
		my %radiacion;
		foreach my $val (values %/{Block}->{cadena}) { 
			$radiacion{$val->{'mes'}} .=$val->{'numeros'};
		}
		
		my $jsonMes= encode_json \%radiacion;

		#write_file('radiacionMensual.json', { binmode => ':raw' }, $json);
		return $jsonMes;
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


# #Ht kWh/m^2
# # mes de Enero...Diciembre
# # H radiacion global acumulada diaria  horizontal
# 	# Ho radiacion global acumulada extraterrestre sobre plano horizontal
# 	# Gsc  1366 w/m^2 según autor= Gueymard 2.004
# 	# Gsc 1353 w/m^2 segun autor = Nasa
# 	# $latitud = grados
# # beta es la inclinación
# #Ho radiacion global extraterrestre
# # dividiendo por 3.6 y por 100000 se pasa de MJ/m^2 a kWh/m^2
# sub def_radiacionDiaInclinada{


# 	my ($mes, $beta, $latitud, $H)=@_;

# 	my $juliano= def_diaJuliano($mes);
# 	my $delta = 23.45 * sin(pi/180*360*(284+ $juliano)/365);
# 	my $Gsc= 1366;
	
# 	#acoseno toma decimales y pasa a 
# 	# las funciones trigonometricas procesan angulos en radianes, por lo tanto hay que convertir los angulos en grados a radianes
# 	# con pi/180 antes de ser procesados por las funciones
# 	# las funciones trigonometricas inversas entregan resultados en radianes por lo tanto hay que pasarlos a grados con el 180/pi

# 	my $omegaS= 180/pi* acos(-tan(pi/180*$latitud)*tan(pi/180*$delta));

# 	my $Ho= (24 * 3600 * $Gsc/pi /3.6 /1000000) * ( 1+0.033 *cos(pi/180*360* $juliano/365)) *(cos(pi/180*$latitud)*cos(pi/180*$delta) * sin(pi/180*$omegaS) + (pi * $omegaS/180*sin(pi/180*$latitud)*sin(pi/180*$delta)) ) ;

# 	#kt es un "indice de claridad" relacion entre la radiacion que llega a la superficie con respecto a la que llega a la atmosfrea,
# 	# ambas horizontales
# 	my $kt= $H/$Ho;

# 	#angulo de puesta del sol para ese plano con inclinación beta
# 	my $omegaSprima;	
# 	my $omegaSprima1= 180/pi* acos(-tan(pi/180*$latitud)*tan(pi/180*$delta)); 
# 	my $omegaSprima2= 180/pi* acos(-tan(pi/180*($latitud+$beta))*tan(pi/180*$delta));

# 	if ($omegaSprima1 < $omegaSprima2){$omegaSprima= $omegaSprima1}
# 	else {$omegaSprima= $omegaSprima2};


# 	#el factor Rb: relacin entre la radiacion directa promedio diario sobre el plano inclinado con respecto a la radiacion directa promedio diario horizontal

# 	my $numerador= cos(pi/180*($latitud+$beta))*cos(pi/180*$delta)*sin(pi/180*$omegaSprima) + (pi/180*$omegaSprima*sin(pi/180*($latitud+$beta))*sin(pi/180*$delta));
# 	my $denominador= cos(pi/180*$latitud)*cos(pi/180*$delta)*sin(pi/180*$omegaS)+ pi/180*$omegaS*sin(pi/180*$latitud)*sin(pi/180*$delta);
# 	my $Rb=  $numerador/$denominador;

# 	#	cos(pi/180*($latitud+$beta))*cos(pi/180*$delta)*sin(pi/180*$omegaSprima)) + ($omegaSprima*sin(pi/180*($latitud+$beta))*sin(pi/180*$delta)))/((cos(pi/180*$latitud)*cos(pi/180*$delta)*sin(pi/180*$omegaS))+($omegaS*sin(pi/180*$latitud)*sin(pi/180*$delta)));
	

# 	my %radiacionDia;

 	
# 	#Liu Jordan: se calcula la radiacion global acumulado sobre el plano inclinado 
# 	$radiacionDia{Htt} = $H *($Rb*(1-$Hd/$H) + ($Hd/$H *(1+cos(pi/180*$beta))/2) + $albedo * (1-cos(pi/180*$beta))/2);
# 	# Proporción de difusa con respecto a global Hd/H ; si bien se llama Hd es Hd/
# 	# 0.755+0.00606 *($omegaS-90)-(0.505+0.00455*($omegaS-90))*cos(pi/180*(115*$kt-103))
# 	# difusa inclinada
#  	$radiacionDia{Hdt} = [0.755+0.00606 *($omegaS-90)-(0.505+0.00455*($omegaS-90))*cos(pi/180*(115*$kt-103))]* $radiacionDia->{Htt};

#  	#directa inclinada 
#  	$radiacionDia{Hbt}= $radiacionDia->{Htt}-$radiacionDia->{Hdt};

	

# 	my $jsonRadDia= encode_json \%radiacionDia;

# 	return $jsonRadDia;
# 	#return $radiacionDia;
# }

# # A partir del mes (Enero, Febrero, ..) me da el numero de dia caracteristico
# sub def_diaJuliano{
#         my ($mes)= @_;

#         my %diaJuliano;

#         $diaJuliano{"Enero"}=17;
#         $diaJuliano{"Febrero"}=47;
#         $diaJuliano{"Marzo"}=75;
#         $diaJuliano{"Abril"}=105;
#         $diaJuliano{"Mayo"}=135 ;
#         $diaJuliano{"Junio"}=162;
#         $diaJuliano{"Julio"}=198;
#         $diaJuliano{"Agosto"}=228;
#         $diaJuliano{"Septiembre"}=258;
#         $diaJuliano{"Octubre"}=288;
#         $diaJuliano{"Noviembre"}=318;
#         $diaJuliano{"Diciembre"}=344;

#         #print Dumper \%diaJuliano;
#         return $diaJuliano{$mes} ;

# }
 

# #obtengo las componentes de la irradiacion mensual 

# sub def_componentesMes{

# 	my ($mes, $beta, $latitud, $Hmes)=@_;

# 	#constante solar
# 	my $Gsc= 1366;
# 	my $juliano= def_diaJuliano($mes);
# 	my $delta = 23.45 * sin(pi/180*360*(284+ $juliano)/365);
# 	my $Ho= (24 * 3600 * $Gsc/pi /3.6 /1000000) * ( 1+0.033 *cos(pi/180*360* $juliano/365)) *(cos(pi/180*$latitud)*cos(pi/180*$delta) * sin(pi/180*$omegaS) + (pi * $omegaS/180*sin(pi/180*$latitud)*sin(pi/180*$delta)) ) ;
# 	my $kt= $Hmes/ $Ho;
# 	my $omegaS= 180/pi* acos(-tan(pi/180*$latitud)*tan(pi/180*$delta));

# 	my $Hdifmes;
# 	if ($omegaS > 81.4 && $kt>=0.3 && $kt<=0.8){
# 		$Hdifmes= [1.391 - (3.560 * $kt )+ (4.189 * $kt **2) - (2.137 * $kt **3) ] * $Hmes;

# 	}
# 	else {
		
# 		$Hdifmes= [1.311 - (3.022 * $kt )+ (3.427 * $kt **2) - (1.821 * $kt **3) ] * $Hmes;
# 	}

# 	my %radiacionMes;

# 	$radiacionMes{Ht}= $Hmes;
# 	$radiacionMes{Hd}= $Hdifmes;
# 	$radiacionMes{Hb}= $Hmes - $Hdifmes;

# 	my $radiacionMes= encode_json \%radiacionMes;

# 	return $radiacionMes

# }



1;
