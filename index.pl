#!/usr/bin/perl
use CGI;
use CGI::Ajax;
use HTML::Template;
use Encode 'decode_utf8';
use JSON::XS qw(encode_json decode_json);
use lib "./modules";
use Calculadora;
use Errores;

my $cgi = new CGI;
my $pjx = new CGI::Ajax( 'goForData' => \&goForData );

#print "Content-Type: text/html; charset=utf-8\n\n";

print $pjx->build_html( $cgi, \&main );



sub main
{
	
	my $html;
	#$print "Content-Type: text/html; charset=utf-8\n\n";
	my $h = HTML::Template->new(filename => './templates/header.html');
	#print $cgi->header;
	#print $h->output;
	$html .=$h->output;
	my $m = HTML::Template->new(filename => './templates/menu.html');
	#print $cgi->header;
	#print $m->output;
	$html .=$m->output;
	my $c = HTML::Template->new(filename => './templates/content.html');
	#print $cgi->header;
	#print $c->output;
	$html .=$c->output;
	my $f = HTML::Template->new(filename => './templates/footer.html');
	#print $f->output;
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

    #my $output =" Devolviendo desde el server ". $lat ."---".$long."....".$type;
    #my %output =({12,23,34,56,67},{232,232,23,23,232});
    #my %output= (manzanas=>5, naranjas=>6, perro=>(1,2,5));

    #my @dias =[22,33,22,45,67,78,787,676,23,12,34,65];
    #my @meses =  [1,2,3,4,5,6,7,8,9,10,11,12];
    #my @valdias = [23,43,54,56];
    #my @valmeses = [23,454,232,23];
    #my @valanual = [34,232,45,34];
    #my @output =[@dias,@meses,@valmeses,@valdias,@valanual,$type]; 
    #my @return = ["Done",@output];
    #my @return = ["Error","Ocurrio un error."];
    my $json= encode_json(\@return);
    #my $output ={ ' test ' => '333'};
	return $json;
}

#agregar parametro de mes/dia/ano y que mes   "

#probando
 #my $output = Calculadora::GetRadMensual('-26.1','-65.9');
 #print $output;
