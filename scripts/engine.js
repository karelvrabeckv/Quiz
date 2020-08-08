/* Počet kroků, které musí panáček vykonat, aby se dostal do domečku. */
const NUM_OF_STEPS = 5; // 1 až N

/* Celkový počet otázek, které se panáčkovi mohou položit. */
const NUM_OF_QUESTIONS = 10; // 1 až POČET OTÁZEK V SOUBORU QUESTIONS.JS

/* Trvání animace (v ms), při které se panáček pohybuje. */
const ANIM_SPEED = 1000; // doporučená hodnota: 1000

/* Trvání animace (v ms), při které se panáček objevuje/mizí. */
const FADE_SPEED = 200; // doporučená hodnota: 200

// ==============================

var lock = 0; // zámek

/* Funkce start() se spouští po kliknutí na tlačítko „NOVÁ HRA“ a probíhá až do chvíle, kdy se panáček poprvé přesune. */
function start()
{
	// jednoduchý zámek, který zabraňuje vícenásobnému spuštění hry
	if (lock)
		return false;
	lock = 1;

	reset(); // všechny věci vrátí do původního stavu
	
	// cyklus, který způsobí blikání a zobrazení panáčka
	for (var i = 0; i < 2; i++)
		$('#man').fadeOut(FADE_SPEED).fadeIn(FADE_SPEED);
	
	$('#man').delay(500); // zpoždění
	move(true); // přesune panáčka blíže k domečku
} // START

// ==============================

/* Funkce reset() způsobí návrat panáčka, otázek, skóre a panáčkových kroků do původního stavu. */
function reset()
{
	// panáček
	$('#man').finish() // ukončí všechny animace
			 .css({top: '70px', left: '165px', display: 'none'}) // přesune panáčka na původní pozici a nechá ho zmizet
			 .attr('src','images/Good.png') // nastaví obrázek smějícího se panáčka
			 .delay(100).fadeIn(FADE_SPEED); // zobrazí panáčka se zpožděním
			 
	// otázky
	q_arr = []; // uvolní pole pro otázky
	$('#question, #score').css({display: 'none'}); // nechá otázky a skóre zmizet
	$('#q_text').css({'font-weight': 'normal', 'color': 'black'}); // formátování otázky vrátí do původního stavu
	
	// skóre
	good = bad = score = 0; // všechny body nastaví na nulu
	$('#s_text').text(score); // zobrazí skóre
	$('#good').text(good); // zobrazí počet správných odpovědí
	$('#bad').text(bad); // zobrazí počet špatných odpovědí
	
	// kroky
	W_STEP = ($('#target').position().left - 305) / (NUM_OF_STEPS + 1); // aktualizace kroku na šířku
	H_STEP = ($('#target').position().top - 70) / (NUM_OF_STEPS + 1); // aktualizace kroku na výšku
} // RESET

// ==============================

var W_STEP, H_STEP; // k tomu, aby panáček přesně došel ke svému domečku, je potřeba celou cestu rozdělit na „POČET KROKŮ + 1“ konstantních kroků na šířku i na výšku

/* Funkce move(way) způsobí přesun panáčka blíže k / dále od domečku. */
function move(way)
{
	// po dokončení přesunu se zavolá funkce pro zobrazení otázky
	if (way) // pro případ přesunu vpřed
		$('#man').animate({'top': '+=' + H_STEP, 'left': '+=' + W_STEP}, ANIM_SPEED, function() {choice();});
	else // pro případ přesunu zpět
		$('#man').animate({'top': '-=' + H_STEP, 'left': '-=' + W_STEP}, ANIM_SPEED, function() {choice();});
} // MOVE

// ==============================

var q_arr = [], // pole pro otázky
	q_corr; // číslo správné odpovědi

/* Funkce choice() způsobí zobrazení náhodné otázky. */
function choice()
{
	lock = 0; // uvolní zámek (hru je možné odteď restartovat)
	
	$('#man').attr('src','images/Question.png'); // nastaví obrázek panáčka, co si neví rady
	$('#q_text').css({'font-weight': 'normal', 'color': 'black'}); // formátování otázky vrátí do původního stavu
	$('#question, #score, #one, #two, #three').css({display: 'block'}); // zobrazí okno pro otázky, skóre a odpovědi
	
	// vybírá číslo (značící otázku) do té doby, dokud nebude unikátní
	while (true)
	{
		var q = Math.floor(Math.random() * NUM_OF_QUESTIONS/* MAX - MIN + 1 */) + 1/* MIN */; // vygeneruje náhodné číslo od 1 do 10
		if (q_arr.indexOf(q) == -1) // pro případ, že se toto číslo nenachází v poli
		{
			q_arr.push(q); // vloží unikátní číslo do pole
			break; // ukončí cyklus
		} // if
		if (q_arr.length == NUM_OF_QUESTIONS) // pro případ, že se pole naplnilo všemi deseti unikátními čísly
			q_arr = []; // uvolní pole
	} // while
	
	q_corr = eval('q_' + q + '()'); // podle náhodně vygenerovaného unikátního čísla zobrazí odpovídající otázku a pamatuje si správnou odpověď
} // CHOICE

// ==============================

var score = 0, // celkové skóre
	good = 0, // počet správných odpovědí
	bad = 0; // počet špatných odpovědí
	
/* Funkce check(a_num) zkontroluje podle přijímaného parametru (tj. číslo tlačítka, na které hráč klikl při odpovídání) správnost hráčovi odpovědi. */
function check(a_num)
{
	$('#q_text').css('font-weight', 'bold'); // ztuční text otázky
	$('#one, #two, #three').css({display: 'none'}); // nechá zmizet všechny odpovědi
	
	if (a_num == q_corr) // v případě, že je odpověď správně
	{
		score++; good++; // zvýší skóre a počet správných odpovědí
		$('#man').attr('src','images/Good.png'); // nastaví obrázek smějícího se panáčka
		
		if (score == NUM_OF_STEPS) // v případě dosažení maximálního skóre se hra ukončí výhrou
			win();
		else // v případě nedostatečného skóre
		{
			$('#q_text').css({color: 'green'}).text('Správně!'); // pochválí hráče
			move(true); // přesune panáčka blíže k domečku
		} // else
	} // if
	else // v případě, že je odpověď špatně
	{
		score--; bad++; // sníží skóre a zvýší počet špatných odpovědí
		$('#man').attr('src','images/Bad.png'); // nastaví obrázek zamračeného panáčka
		
		if (score == -1) // v případě dosažení záporného skóre se hra ukončí prohrou
			game_over();
		else // v případě nedostatečného skóre
		{
			$('#q_text').css({color: 'red'}).text('Špatně!'); // vynadá hráči
			move(false); // přesune panáčka dále od domečku
		} // else
	} // else
	
	$('#s_text').text(score); // zobrazí skóre
	$('#good').text(good); // zobrazí počet správných odpovědí
	$('#bad').text(bad); // zobrazí počet špatných odpovědí
} // CHECK

// ==============================

/* Funkce win() ukončí hru v případě výhry. */
function win()
{
	$('#q_text').css({color: 'green'}).text('Výhra!'); // pochválí hráče
	$('#man').animate({'top': '+=' + H_STEP, 'left': '+=' + W_STEP}, ANIM_SPEED); // přesune panáčka k domečku
	
	// cyklus, který způsobí blikání a zmizení panáčka
	for (var i = 0; i < 4; i++)
		$('#man').fadeIn(FADE_SPEED).fadeOut(FADE_SPEED);
} // WIN

/* Funkce game_over() ukončí hru v případě prohry. */
function game_over()
{
	$('#q_text').css({color: 'red'}).text('Prohra!'); // vynadá hráči
	$('#man').animate({'top': '-=' + H_STEP, 'left': '-=' + W_STEP}, ANIM_SPEED); // přesune panáčka na start
	
	// cyklus, který způsobí blikání a zmizení panáčka
	for (var i = 0; i < 4; i++)
		$('#man').fadeIn(FADE_SPEED).fadeOut(FADE_SPEED);
} // GAME OVER