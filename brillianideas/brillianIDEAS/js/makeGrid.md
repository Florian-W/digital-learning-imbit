## Classes

<dl>
<dt><a href="#rectOutlines">rectOutlines</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#movedInCombo[undefined][undefined]">movedInCombo[undefined][undefined]</a></dt>
<dd><p>verhindert, dass eine Karte zwischen zwei bereits platzierten hin und her pingt</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#digitalLearningArray">digitalLearningArray</a> : <code>Array</code></dt>
<dd><p>Konfiguration für das Koordnatensystem inkl. X-Y-Koordinaten und die Anzeigereihenfolge</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#noOverlayInGrid">noOverlayInGrid(id, x, y, count, key)</a></dt>
<dd><p>Verschiebt alle Elemente im Koordinatensystem, sodass sie sich nicht überschneiden.</p>
</dd>
<dt><a href="#makeGrid">makeGrid(Entscheidungsparameter)</a> ⇒ <code>undefined</code></dt>
<dd><p>Erstellt und animiert die Darstellungen der Lerninhalte</p>
</dd>
</dl>

<a name="rectOutlines"></a>

## rectOutlines
**Kind**: global class  
**Author**: Nick London <nick.london94@gmail.com>  

* [rectOutlines](#rectOutlines)
    * [new rectOutlines($div)](#new_rectOutlines_new)
    * _instance_
        * [.left](#rectOutlines+left) : <code>Number</code>
        * [.top](#rectOutlines+top) : <code>Number</code>
        * [.width](#rectOutlines+width) : <code>Number</code>
        * [.height](#rectOutlines+height) : <code>Number</code>
        * [.right](#rectOutlines+right) : <code>Number</code>
        * [.bottom](#rectOutlines+bottom) : <code>Number</code>
        * [.overlapsWidth(target)](#rectOutlines+overlapsWidth) ⇒ <code>boolean</code>
    * _static_
        * [.overlaps(obj1, obj2)](#rectOutlines.overlaps) ⇒ <code>boolean</code>

<a name="new_rectOutlines_new"></a>

### new rectOutlines($div)
Sammelklasse für die Außendimensionen von Elementen des Koordinatensystems. Alle Koordinaten sind berechnet von der oberen linken Ecke des Dokuments.


| Param | Type | Description |
| --- | --- | --- |
| $div | <code>Object</code> | Die Flipcard (Koordinatensystem-Element), dessen Dimensionen berechnet werden sollen. |

<a name="rectOutlines+left"></a>

### rectOutlines.left : <code>Number</code>
**Kind**: instance property of <code>[rectOutlines](#rectOutlines)</code>  
<a name="rectOutlines+top"></a>

### rectOutlines.top : <code>Number</code>
**Kind**: instance property of <code>[rectOutlines](#rectOutlines)</code>  
<a name="rectOutlines+width"></a>

### rectOutlines.width : <code>Number</code>
**Kind**: instance property of <code>[rectOutlines](#rectOutlines)</code>  
<a name="rectOutlines+height"></a>

### rectOutlines.height : <code>Number</code>
**Kind**: instance property of <code>[rectOutlines](#rectOutlines)</code>  
<a name="rectOutlines+right"></a>

### rectOutlines.right : <code>Number</code>
**Kind**: instance property of <code>[rectOutlines](#rectOutlines)</code>  
<a name="rectOutlines+bottom"></a>

### rectOutlines.bottom : <code>Number</code>
**Kind**: instance property of <code>[rectOutlines](#rectOutlines)</code>  
<a name="rectOutlines+overlapsWidth"></a>

### rectOutlines.overlapsWidth(target) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[rectOutlines](#rectOutlines)</code>  
**Returns**: <code>boolean</code> - Wahr, wenn das Vergleichsobjekt dieses Objekt überlappt  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>[rectOutlines](#rectOutlines)</code> | Zweites Objekt des selben Typen |

<a name="rectOutlines.overlaps"></a>

### rectOutlines.overlaps(obj1, obj2) ⇒ <code>boolean</code>
**Kind**: static method of <code>[rectOutlines](#rectOutlines)</code>  
**Returns**: <code>boolean</code> - Wahr, wenn die Vergleichsobjekte sich überlappen  

| Param | Type | Description |
| --- | --- | --- |
| obj1 | <code>[rectOutlines](#rectOutlines)</code> | Vergleichsobjekt |
| obj2 | <code>[rectOutlines](#rectOutlines)</code> | Vergleichsobjekt |

<a name="movedInCombo[undefined][undefined]"></a>

## movedInCombo[undefined][undefined]
verhindert, dass eine Karte zwischen zwei bereits platzierten hin und her pingt

**Kind**: global variable  
<a name="digitalLearningArray"></a>

## digitalLearningArray : <code>Array</code>
Konfiguration für das Koordnatensystem inkl. X-Y-Koordinaten und die Anzeigereihenfolge

**Kind**: global constant  
<a name="noOverlayInGrid"></a>

## noOverlayInGrid(id, x, y, count, key)
Verschiebt alle Elemente im Koordinatensystem, sodass sie sich nicht überschneiden.

**Kind**: global function  
**Author**: Nick London <nick.london94@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | ID des HTML-DOM-Node |
| x | <code>Number</code> | Ziel-X-Position des Elements 0 < x < 1 |
| y | <code>Number</code> | Ziel-Y-Position des Elements 0 < y < 1 |
| count | <code>String</code> \| <code>Number</code> | Position in der Reihenfolge des Erscheinens |
| key | <code>Number</code> | Position im Konfigurationsarray |

<a name="noOverlayInGrid..loop"></a>

### noOverlayInGrid~loop
Setze lokale Variablen

**Kind**: inner property of <code>[noOverlayInGrid](#noOverlayInGrid)</code>  
<a name="makeGrid"></a>

## makeGrid(Entscheidungsparameter) ⇒ <code>undefined</code>
Erstellt und animiert die Darstellungen der Lerninhalte

**Kind**: global function  
**Returns**: <code>undefined</code> - nothing  
**Author**: Nick London <nick.london94@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| Entscheidungsparameter | <code>String</code> | welche Ansicht erstellt wird |


* [makeGrid(Entscheidungsparameter)](#makeGrid) ⇒ <code>undefined</code>
    * [~cleanUp();()](#makeGrid..cleanUp_new;)
    * [~sortTiles(a)](#makeGrid..sortTiles) ⇒ <code>boolean</code>
    * [~animateTile(obj)](#makeGrid..animateTile)
    * [~animateTiles()](#makeGrid..animateTiles)
    * [~loadLearnings(obj)](#makeGrid..loadLearnings)
    * [~fillTile(i, obj)](#makeGrid..fillTile)
    * [~fillTiles()](#makeGrid..fillTiles)

<a name="makeGrid..cleanUp_new;"></a>

### makeGrid~cleanUp();()
Entfernt temporäre Änderungen am DOM und entfernt Zeilenumbrüche, die aus der Erstellungstechnik der Ansicht entstehen.

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  
<a name="makeGrid..sortTiles"></a>

### makeGrid~sortTiles(a) ⇒ <code>boolean</code>
Sortiert die einzelnen Lerntypen auf Basis des data-sid Attributes

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  
**Returns**: <code>boolean</code> - true wenn A in einer aufsteigenden Sortierung hinter B erscheinen sollte  
**Patam**: b (jQuery)  

| Param | Description |
| --- | --- |
| a | {jQuery) |

<a name="makeGrid..animateTile"></a>

### makeGrid~animateTile(obj)
Blendet das mitgegebene Objekt ein und startet das Einblenden des Folgeobjekts

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>jQuery</code> \| <code>Object</code> | Das zu animierende Objekt. |

<a name="makeGrid..animateTiles"></a>

### makeGrid~animateTiles()
Führt die Animationen des Koordinatensystems aus und ruft weitere Subroutinen auf

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  
<a name="makeGrid..loadLearnings"></a>

### makeGrid~loadLearnings(obj)
Läd die einzelnen Lerninhalte eines Lerntypen via AJAX nach

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>jQuery</code> \| <code>Object</code> | jQuery Collection oder DOM-Element des Lerntypen |

<a name="makeGrid..fillTile"></a>

### makeGrid~fillTile(i, obj)
Läd die DOM-Elemente der Lerntypen nach

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>Number</code> | Zähler der jQuery.each Schleife. In der Funktion nicht genutzt |
| obj | <code>jQuery</code> \| <code>Object</code> | Objekt des entsprechenden Lerntypen |

<a name="makeGrid..fillTiles"></a>

### makeGrid~fillTiles()
Lädt das äußere Grid nach

**Kind**: inner method of <code>[makeGrid](#makeGrid)</code>  
