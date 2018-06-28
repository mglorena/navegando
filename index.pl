#!/usr/bin/perl
use CGI;
use CGI::Ajax;
use HTML::Template;
use Encode 'decode_utf8';
use JSON::XS qw(encode_json decode_json);
use lib "./modules";
use Calculadora;
use Errores;
use Conf;
my $cgi = new CGI;
my $pjx = new CGI::Ajax( 'goForData' => \&goForData , 'goCalcularFoto' =>\&goCalcularFoto);

#print "Content-Type: text/html; charset=utf-8\n\n";

print $pjx->build_html( $cgi, \&main );



sub main
{
	
	my $html;
	#$print "Content-Type: text/html; charset=utf-8\n\n";
	my $h = HTML::Template->new(filename => './templates/header.html');
        $h->param(HOST => "'".$Conf::hostGeoMapa."'");
        $h->param(VERSION => "1.7");
	$html .=$h->output;
	my $m = HTML::Template->new(filename => './templates/menu.html');
	$html .=$m->output;
	my $m = HTML::Template->new(filename => './templates/mapa.html');
	$html .=$m->output;
    $html .="<div class='toolbarForms'>";
        my $ii = HTML::Template->new(filename => './templates/infoInfo.html');
        $html .=$ii->output;
        my $ir = HTML::Template->new(filename => './templates/infoRad.html');
        $html .=$ir->output;
        my $itm = HTML::Template->new(filename => './templates/infoTemp.html');
        $html .=$itm->output;
        my $if = HTML::Template->new(filename => './templates/infoFoto.html');
        $html .=$if->output;
        my $itr = HTML::Template->new(filename => './templates/infoTerm.html');
        $html .=$itr->output;
       
    $html .="</div>";
    my $c = HTML::Template->new(filename => './templates/toolCal.html');
    $html .=$c->output;
    my $f = HTML::Template->new(filename => './templates/footer.html');
    $f->param(VERSION => "1.6");
    $html .=$f->output;
	$html = decode_utf8($html);
	#$html .="<div>". Calculadora::GetRadiacion('-24.9124','-65,3961','anual')."<(div>";
    return $html;

}

# sub sendJsError($ex, $pageName, $object) {

#     $errorS = new Errors();
#     my $resp = Errores::SendJsErrorMessage($ex, $pageName, $object);
#     return $resp;
# }

sub goForData {
 

    my ($lat,$long,$type) = @_;

    my @return = Calculadora::GetRadiacion($lat,$long,$type);

    #0 - Done
    #1- @dias =[22,33,22,45,67,78,787,676,23,12,34,65];
    #2- @meses =  [1,2,3,4,5,6,7,8,9,10,11,12];
    #3- @valdias = [23,43,54,56];
    #4- @valmeses = [23,454,232,23];
    #5- @valanual = [34,232,45,34];
    #6 -@valTemp = [valanual,22,33,22,45,67,78,787,676,23,12,34,65];
    #6 @output =[@dias,@meses,@valmeses,@valdias,@valanual,$type]; 
    #my @return = ["Done",@output];
    #my @return = ["Error","Ocurrio un error."];
    my $json= encode_json(\@return);
    #my $output ={ ' test ' => '333'};
	return $json;
}

sub goCalcularFoto {
 

    my ($datos) = @_;

    #my @return = Fotovoltaico::calculaEnergia($datos);
    my @output =[123,234,232,112,252,268,244,233,288,122,203,206];
    my @return = ["Done",@output];
    my $json= encode_json(\@return);
    
    return $json;
}

#agregar parametro de mes/dia/ano y que mes   "

#probando
 #my $output = Calculadora::GetRadMensual('-26.1','-65.9');
 #print $output;
