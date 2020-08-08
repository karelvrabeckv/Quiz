/*

// ==============================
// ŠABLONA FUNKCE PRO ZOBRAZENÍ OTÁZKY
// ==============================
// POSTUP:
// - zkopírovat šablonu a vytvořit odkomentovanou kopii
// - vyplnit otázku a všechny tři odpovědi
// - N nahradit číslem otázky
// - X nahradit číslem odpovědi
// ==============================

function q_N()
{
	$('#q_text').text('Otázka'); // zobrazí otázku
	
	$('#one').val('Odpověď1'); // zobrazí první odpověď
	$('#two').val('Odpověď2'); // zobrazí druhou odpověď
	$('#three').val('Odpověď3'); // zobrazí třetí odpověď
	
	return X; // vrátí číslo správné odpovědi
} // Q_N

// ==============================
	
*/

function q_1()
{
	$('#q_text').text('Co je to JavaScript?');
	
	$('#one').val('Skriptovací jazyk');
	$('#two').val('Značkovací jazyk');
	$('#three').val('Objektově neorientovaný jazyk');
	
	return 1;
} // Q_1

// ==============================

function q_2()
{
	$('#q_text').text('V jakém roce byl spuštěn portál Seznam.cz?');
	
	$('#one').val('1986');
	$('#two').val('1996');
	$('#three').val('2006');
	
	return 2;
} // Q_2

// ==============================

function q_3()
{
	$('#q_text').text('V jakém roce byla založena FBMI ČVUT?');
	
	$('#one').val('1995');
	$('#two').val('2003');
	$('#three').val('2005');
	
	return 3;
} // Q_3

// ==============================

function q_4()
{
	$('#q_text').text('Koho označuje zkratka n00b?');
	
	$('#one').val('Úplného nováčka');
	$('#two').val('Zkušeného hackera');
	$('#three').val('Vrcholného politika');
	
	return 1;
} // Q_4

// ==============================

function q_5()
{
	$('#q_text').text('Kdo je autorem HTML?');
	
	$('#one').val('Steve Jobs');
	$('#two').val('Tim Berners-Lee');
	$('#three').val('Håkon Wium Lie');
	
	return 2;
} // Q_5

// ==============================

function q_6()
{
	$('#q_text').text('Kdo je autorem slova robot?');
	
	$('#one').val('Robot');
	$('#two').val('Tomáš Garrigue Masaryk');
	$('#three').val('Josef Čapek');
	
	return 3;
} // Q_6

// ==============================

function q_7()
{
	$('#q_text').text('Kdo je autorem hlášky: „Všichni víme, že Linux je skvělý... dokáže dělat nekonečné smyčky za pět sekund.“?');
	
	$('#one').val('Linus Torvalds');
	$('#two').val('Mark Zuckerberg');
	$('#three').val('Bill Gates');
	
	return 1;
} // Q_7

// ==============================

function q_8()
{
	$('#q_text').text('Co je to CPU?');
	
	$('#one').val('Grafický procesor');
	$('#two').val('Centrální procesorová jednotka');
	$('#three').val('Ovladač na televizi');
	
	return 2;
} // Q_8

// ==============================

function q_9()
{
	$('#q_text').text('Jaká je anglická zkratka pro ČVUT?');
	
	$('#one').val('TUVČ');
	$('#two').val('CVUT');
	$('#three').val('CTU');
	
	return 3;
} // Q_9

// ==============================

function q_10()
{
	$('#q_text').text('Co znamenají písmena ve zkratce CSS?');
	
	$('#one').val('Cascading Style Sheets');
	$('#two').val('Cooperating Stylish Sheep');
	$('#three').val('Cosi Suprově Suprového');
	
	return 1;
} // Q_10