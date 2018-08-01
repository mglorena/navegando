package Calefon;
use Switch;
use Math::Trig;
use Data::Dumper;

#se toma 50 litros de agua por persona por día
#Tipo de colector 0 es placa plana y 1 tubo evacuado
sub calculaFraccion{

	my $datos = $_[0];

	# Separo datos tal cual me los pasan en el array primero va radiacion y luego
    #TAL VEZ HAYA QUE AGREGAR MINIMAS Y MAXIMAS	
	my ($latitud,$cantPersonas,$tipoColector,@RadYtemp)= split(/,/,$datos);
	# separo los arrays de radiacion y temperatura 
	for (my $i=0; $i<=11;$i++){

           push @h_Mes, $RadYtemp[$i];
    }
    for (my $i=12; $i<=23;$i++){
             push @tempMensual, $RadYtemp[$i];
    }
   

    #calculo promedio de irradiación diaria por mes a partir de acumulada mensual
    my @cantDias =(31,28,31,30,31,30,31,31,30,31,30,31);
     for ($i=0; $i<=11;$i++) {
       @h_Mes[$i]=@h_Mes[$i]/ @cantDias[$i];
      };
    
     my @TempRed;
    #calculo de temperatura de red
    for ($i=0; $i<=11;$i++){
    	my $sinu= cos(pi/180*2*pi*($i-1/12));
		#print $sinu * @tempMensual[$i];
		#exit;
    	@TempRed[$i]= @tempMensual[$i] ;#+ @tempMensual[$i] * $sinu; 

    }

 	#variables necesarias para radiación inclinada
    my $beta= 30;
    my $albedo= 0.25; 
    my $mesInclinada= calculaInclinadaMensual($latitud,$beta,$albedo,@h_Mes);

    #controlo tipo de colector y asigno Fr(tau *alpha) y Fr * Ul 
    my $Fr= 0;
    my $FrUl= 0;

    if ($tipoColector==0) {
    	$Fr= 0.68;
    	$FrUl= 4.90;
    }
    else {
    	$Fr= 0.58;
    	$FrUl= 0.7;
    }
    my $Eabsorvida= calculaEnergiaColector($cantPersonas,$Fr,$mesInclinada);
    #pongo $mesInclinada en vez de temp ambiente y de red por que poseen la misma
    #estructura pero habría que reemplazar
    my $Qcol= calculaCargaTermica($Fr,$FrUl,$mesInclinada,$mesInclinada);
    my $D1= calculoD1($Eabsorvida,$Qcol);
   
    my $Eperdida= calculoEnergiaPerdida($cantPersonas,$FrUl,$Tamb);
    my $Qload= calculoQload($mesInclinada);
   
    my $D2= calculoD2($Eperdida, $Qload);

    my $Fchart= calculoFchart($D1,$D2);
    print Dumper $Fchart; 		
    return $Fchart;
}


sub calculoFchart{
    my ($D1,$D2)= @_;

    my $Fchart;
    for (my $i=0; $i<=11;$i++){
        my $D1cuadrado= $D1->{$i} * $D1->{$i};
        my $D2cuadrado= $D2->{$i} * $D2->{$i};
        
        $Fchart->{$i}= (1.029 * $D1->{$i}) - (0.065 * $D2->{$i} )- (0.245 * $D1cuadrado) + (0.0018 *$D2cuadrado) + (0.0215 * $D1cuadrado);
    }
    return $Fchart;

}
sub calculoD2{
    my ($Eperdida,$Qload)= @_;
    my $D2;
    for (my $i=0; $i<=11;$i++){
        $D2->{$i}= $Eperdida->{$i}/$Qload->{$i};
    }
    return $D2;

}
#ME FALTA SABER EL CONSUMO DIARIO EN LITROS, ¿DEPENDE DE LA CANTIDAD DE PERSONAS?
sub calculoQload{
    my ($TempRed)= @_;

    my $calorEspecificoAgua= 4187;  #esta expresado en Joules/kg °C
    my $TempUso= 60; #fijamos de acuerdo a las costumbres
    my @cantDias =(31,28,31,30,31,30,31,31,30,31,30,31);
    my $consumoDiario=50; #puse por fijar algo

    for (my $i=0; $i<=11;$i++){
        $TempRed->{$i}= $calorEspecificoAgua* @cantDias[$i]*($TempUso- $TempRed->{$i});

    }
    print Dumper $TempRed;
    return $TempRed;
}

sub calculoEnergiaPerdida{
    
    my ($cantPersonas,$FrUl,$TempRed, $Tamb)= @_;
    #calculo superficie de colector en fncion de cantidad de personas
    if ($cantPersonas==0 || $cantPersonas==1){
        $Sc=1;
    }else {
        $Sc= $cantPersonas * 0.5;
    }
    
    #suponemos que el almacenamiento es de 50 litros por metros cuadrados
    my $K1= (50/(75*$Sc))**(-0.25);
    my $K2, $Tacmin;
    $Tacmin=50;

    for (my  $i=0; $i<=11;$i++){
        $K2->{$i}= 11.6 + 1.18 * $Tacmin + 3.86 * $TempRed->{$i} - 2.32 * $Tamb->{$i} / (100 - $Tamb->{$i});
    }

    my @cantSegundos;
    my @cantDias =(31,28,31,30,31,30,31,31,30,31,30,31);
    for ($i=0; $i<=11;$i++){
        @cantSegundos[$i]= @cantDias[$i] * 86400; #siendo 86400 cantidad de segundos en un dia
    }
  
    my $Eperdida;
    for ($i=0; $i<=11;$i++){
        $Eperdida->{$i}= $Sc * $FrUl *(100-$Tamb->{$i})*@cantSegundo[$i] *$K1 * $K2;

    }
    #print Dumper @cantSegundos;
    return $Eperdida;
}

sub calculoD1{
    my ($Eabsorvida, $Qcol)= @_;

    my $D1;
    for ($i=0; $i<=11;$i++){
         $D1->{$i} = $Eabsorvida->{$i}/$Qcol->{$i};
    }

    return $D1;
}

#se encuentra expresado en 
sub calculaEnergiaColector{
	my ($cantPersonas, $Fr,$Hbeta)=@_;
    
    my $Sc=1; #Sc= superficie colector
    my @cantDias =(31,28,31,30,31,30,31,31,30,31,30,31);
	if ($cantPersonas==0 || $cantPersonas==1){
		$Sc=1;
	}else {
		$Sc= $cantPersonas * 0.5;
	}

    my $Eabsorvida;
	for ($i=0; $i<=11;$i++){
		$Eabsorvida->{$i}= $Sc * $Fr * $Hbeta->{$i}*$cantDias[$i] ;
	}
    return $Eabsorvida;
}


#Gsc  1366 w/m^2 según autor= Gueymard 2.004
sub calculaCargaTermica{
	my ($Fr, $FrUl, $TempRed, $Tamb) = @_;

    my $G= 1366; #W/m^2
    my $Qcol;
    for ($i=0; $i<=11;$i++){
        $Qcol->{$i}= ($Fr * $G) - ($FrUl * ($TempRed->{$i}-$Tamb->{$i}));
    }
    return $Qcol;
}


sub calculaInclinadaMensual{

 my ($latitud,$beta,$albedo,@h_Mes)= @_;

my  $Htinclinada, $mesInclinada;

for (my $i=1; $i < 366; $i++) {
             
             switch ($i){
             	case [0..31] {
             				$mes=0;
             			
             				$Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
             			
             				push(@{$mesInclinada->{$mes}},$Htinclinada);
             			
             				}


             	case [32..59] {
             				$mes=1;
             				$Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 
                                    
                              }

             	case [59..90] {
             				$mes=2;
             				
                                    $Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 
             	}

      	       	case [91..120] {
             				$mes=3;
             				$Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 
             	}

             	case [121..151] {
             				$mes=4;
             				$Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 

             	}
             	case [152..181] {
             				$mes=5;
             				$Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 
             	}

             	case [182..212] {
             				$mes=6;
             				
                                    $Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 

             				}
             	case [212..243] {
             				$mes=7;
             				 $Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                     push(@{$mesInclinada->{$mes}},$Htinclinada);

             				}

             	case [244..273] {
             				$mes=8;
             				$Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                    push(@{$mesInclinada->{$mes}},$Htinclinada); 

             	}

             	case [274..304] {
             				$mes=9;
             				 $Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                     push(@{$mesInclinada->{$mes}},$Htinclinada); 
             	}

             	case [305..334] {
             				$mes=10;
             				 $Htinclinada=def_inclina($latitud,$h_Mes[$mes], $beta, $i,$albedo);
                                     push(@{$mesInclinada->{$mes}},$Htinclinada); 
             	}

             	case [335..365] {
             				$mes=11;
             				 $Htinclinada=def_inclina($latitud,$h_Mes[$mes],$beta, $i,$albedo);
                                     push(@{$mesInclinada->{$mes}},$Htinclinada); 
             	}
             }
      }

  
      #acumulo por mes 
      my $mensual;
            for (my $i=0; $i<=11; $i++){
            		$mensual->{$i}=0;
            	foreach  (@{$mesInclinada->{$i}}){
            		
            		$mensual->{$i}+= $_;
            		
            	 	}
            	 
            };

      return  $mensual;     

}
sub def_inclina{

            my ($latitud,$H,$beta,$juliano,$albedo)=@_;


            my $delta = 23.45 * sin(pi/180*360*(284+ $juliano)/365);
            my $Gsc= 1366;
            my $omegaS = 180/pi* acos(-tan(pi/180*$latitud)*tan(pi/180*$delta));
            
            my $omegaSprima1= 180/pi* acos(-tan(pi/180*$latitud)*tan(pi/180*$delta)); 
     		my $omegaSprima2= 180/pi* acos(-tan(pi/180*($latitud+$beta))*tan(pi/180*$delta));
			my $omegaSprima;
			if ($omegaSprima1 < $omegaSprima2){$omegaSprima= $omegaSprima1}
     		else { $omegaSprima=$omegaSprima2};

            my $numerador= cos(pi/180*($latitud+$beta))*cos(pi/180*$delta)*sin(pi/180*$omegaSprima) + (pi/180*$omegaSprima*sin(pi/180*($latitud+$beta))*sin(pi/180*$delta));
            my $denominador= cos(pi/180*$latitud)*cos(pi/180*$delta)*sin(pi/180*$omegaS)+ pi/180*$omegaS*sin(pi/180*$latitud)*sin(pi/180*$delta);
            my $Rb=  $numerador/$denominador;
            my $Ho= (24 * 3600 * $Gsc/pi /3.6 /1000000) * ( 1+0.033 *cos(pi/180*360* $juliano/365)) *(cos(pi/180*$latitud)*cos(pi/180*$delta) * sin(pi/180*$omegaS) + (pi * $omegaS/180*sin(pi/180*$latitud)*sin(pi/180*$delta)) ) ;
            my $kt = $H/$Ho;

            my $Hd = 0.755+0.00606 *($omegaS-90)-(0.505+0.00455*($omegaS-90))*cos(pi/180*(115*$kt-103));
            my $betaR= pi/180*$beta;

            my $Ht = $H *($Rb*(1-$Hd/$H) + ($Hd/$H *(1+cos($betaR))/2) + $albedo * (1-cos($betaR))/2);

            return $Ht;

}


1;




