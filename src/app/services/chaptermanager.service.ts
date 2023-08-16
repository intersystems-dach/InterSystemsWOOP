import { Injectable } from '@angular/core';
import { Chapter, VerifyCache } from 'src/utils/classes';

@Injectable({
  providedIn: 'root',
})
export class ChaptermanagerService {
  public chapters: Chapter[] = [];
  public allChapters: Chapter[] = [];
  private initDone = false;

  private errorChapter = new Chapter('Error 404', '', []);

  currentChapter: Chapter = this.errorChapter;

  constructor() {
    this.init();
  }

  async init() {
    if (this.initDone) return;
    this.allChapters = this.getAllChapters();
    for (let chapter of this.allChapters) {
      if (chapter.Password === undefined) {
        chapter.Password = '';
      }
      if (chapter.Language === undefined) {
        chapter.Language = '';
      }
      if (chapter.Author === undefined) {
        chapter.Author = '';
      }
      if (chapter.IsPrivate === undefined) {
        chapter.IsPrivate = false;
      }
      if (chapter.Description === undefined) {
        chapter.Description = '';
      }
      if (chapter.Pages === undefined) {
        chapter.Pages = [];
      }

      for (let page of chapter.Pages) {
        if (page.Content === undefined) {
          page.Content = '';
        }
        if (page.Hint === undefined) {
          page.Hint = '';
        }
        if (page.Result === undefined) {
          page.Result = '';
        }
      }

      if (chapter.Password === '') {
        VerifyCache.verifyChapter(chapter.Title);
      }
    }
    this.allChapters = this.sortChaptersAlphabetically(this.allChapters);
    this.chapters = this.allChapters;
    this.initDone = true;
  }

  getAllChapters(): Chapter[] {
    const chapter: any = {
      Title: 'Welcome chapter test',
      Language: 'english',
      Author: 'test',
      Description:
        'This is a test chapter to welcome you to the InterSystems Workshop Organizer and Optimizer Program!',
      IsPrivate: false,
      Pages: [
        {
          Content:
            '![logo](assets/imgs/InterSystemsWOOPLogo.png){width: 20%}\n\n# Welcome to InterSystems Workshop Organizer and Optimizer Program\n\nThe InterSystems Workshop Organizer and Optimizer Program is a program designed to help you organize and optimize your InterSystems workshop experience. The program is designed to help you get the most out of your workshop experience by providing you with a set of tools and resources to help you organize your workshop experience.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '## Create your first workshop\n\nTo create your first workshop, you will need to be logged in. On the homepage you can see a list of all the workshops you have created and a + button to create a new workshop.\n\nThe program will displays you a form to fill in the details of your workshop:\n\n-   **Name**: The name of your workshop.\n-   **Language**: The language of your workshop.\n-   **Password**: The password of your workshop.\n-   **Private**: If enabled the workshop is private and only accessible by you.\n-   **Description**: A short description of your workshop.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '## Edit your workshop\n\nTo edit your workshop, you will need to be logged in. On the homepage you can see a list of all the workshops you have created and a edit button to edit your workshop.Clicking on the edit button you will be navigated to the edit page of your workshop.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '## Add your first page\n\nWhen you edit a workshop you can add and remove pages. Lets add a page and have a look at a page...\n\nHow you can see, the page is divided in three parts:\n\n-   **Conent**: Here you can write the content of your page. Usually you will create your exercises here.\n-   **Hint**: Here you can write a hint for the exercise.\n-   **Result**: Here you can write the solution of the exercise.',
          Hint: '## Hint\n\nThis is a Hint.',
          Result: '## Result\n\nThis is a result.',
        },
        {
          Content:
            '## Writing pages\n\nPages are written in Markdown. You can find a Markdown cheatsheet by clicking on the _help_ button.\n\nLets take a look at all the features of the Markdown language...',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '### Haedings\n\nYou can create headings by adding a `#` in front of your text. The number of `#` defines the level of the heading.',
          Result:
            '~~~markdown\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Text\n\nYou can write text as you would do in any other text editor.',
          Result: '~~~markdown\nThis is a text.\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Styling your text\n\n- Text can be **bold** by adding `**` in front and after your text.\n- Text can be *italic* by adding `*` in front and after your text.\n- Text can be ~~strikethrough~~ by adding `~~` in front and after your text.',
          Result: '~~~markdown\n**bold**\n*italic*\n~~strikethrough~~\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Unordered Lists\n\nYou can create lists by adding a `-` in front of your text.',
          Result: '~~~markdown\n- Item 1\n- Item 2\n- Item 3\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Ordered Lists\n\nYou can create ordered lists by adding a number and a `.` in front of your text.',
          Result: '~~~markdown\n1. Item 1\n2. Item 2\n3. Item 3\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Links\n\nYou can create links by adding `[` and `]` in front and after your text. The first part is the text of the link and the second part is the link itself.',
          Result: '~~~markdown\n[Link text](https://www.intersystems.com)\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Images\n\nYou can add images by adding `![` and `]` in front and after your text. The first part is the alt text of the image and the second part is the link to the image.',
          Result: '~~~markdown\n![Alt text](url){css}\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Code Block\n\nYou can add code by adding ` ``` ` in front and after your text. The first part is the language of the code and the second part is the code itself.',
          Result:
            '~~~markdown\n```javascript\nconsole.log("Hello World!");\n```\n~~~',
          Hint: '',
        },
        {
          Content:
            '### Code Window\n\nYou can add code by adding ` ~~~ ` in front and after your text. The first part is the language of the code and the second part is the code itself.',
          Result:
            '~~~markdown\n ~~~javascript\n console.log("Hello World!");\n ~~~\n~~~',
          Hint: '',
        },
        {
          Content:
            '## Have fun!\n\nNow you can create your own workshops and have fun!',
          Hint: '',
          Result: '',
        },
      ],
      Password: '',
    };
    const chapter2: any = {
      Title: 'ObjectScript Grundlagen',
      Language: 'deutsch',
      Author: 'pbonin',
      Description: 'Grundlagen Kurs für Objectscript',
      IsPrivate: false,
      Pages: [
        {
          Content:
            '# Einleitung\n\nIn den nachfolgenden Übungen erstellen Sie Schritt für Schritt ein einfaches Datenmodell zur Implementierung einer Warenwirtschaft. Darauf aufbauend werden Daten zu dem Modell erzeugt und anschließend werden verschiedene Techniken demonstriert und geübt, mit den Daten zu arbeiten. Dabei werden sowohl der Objektzugriff als auch die verschiedenen Möglichkeiten mit SQL genutzt, um die Daten zu verarbeiten. Eine weitere Rolle wird die Implementierung von Logik über Klassen- und Instanzmethoden sein. Zum Abschluss werden die unterschiedlichen Projekten (XML, JSON) genutzt, um Webservices (SOAP und REST) zu implementieren.\n\nEs ist dringend empfohlen, die Bezeichner so zu verwenden, wie im Übungsskript angegeben, da die Übungen aufeinander aufbauen.Die Aufgaben basieren auf der Annahme dass der Namespace _TRAINING_ verwendet wird und der Server unter `localhost:52773` installiert ist. Für eine andere Konfiguration bitte daran denken, die folgenden Anweisungen entsprechend anzupassen. Bis auf die Artikelklasse werden alle Inhalte neu erstellt. Falls in einer eigenen Umgebung gearbeitet wird, stellt der Kursleiter diese Datei zum Import zur Verfügung. Auch die API Spezifikation für Übung 17 wird separat verteilt.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '## Aufgabe 1 _Persistent vs. Registered vs. Serial_\n\nIn InterSystems IRIS gibt es verschiedene Möglichkeiten, Datenklassen zu definieren. Es wird unterschieden in:\n   - **Persistent**: Objekte dieses Typs können dauerhaft gespeichert werden und haben standardmäßig eine SQL-Projektion\n   - **Registered**: Objekte dieses Typs existieren nur im Memory und sind somit flüchtig\n   - **Serial**: Diese Objekte werden in persistente oder registrierte Objekte eingebettet und haben in der Datenbank keine eigene Identität. Wird das einbettende Objekt zerstört, wird auch das eingebettete Objekt zerstört.\n          ',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '1. Beginnen wir mit der Definition einer Klasse für das Speichern der Kunden in der Datenbank **training.Kunde**. Dabei handelt es sich um eine persistente Klasse, da Kundenobjekte dauerhaft gespeichert werden sollen und auch per SQL zugreifbar sein sollen.\n2. Die Klasse soll zunächst die beiden Properties **KundenNr** _%Integer_ und **Name** _%String_ haben. \n3. Definieren Sie für das Property **KundenNr** den **MINVAL = 1**. Da wir später den Datengenerator mvon IRIS nutzen wollen, soll die Klasse zunächst von _**%Persistent**_ und _**%Populate**_ erben. Ein Speichern des Kunden ohne dass eine KundenNr und ein Name spezifiziert wurden, soll **nicht** möglich sein. Deshalb definieren wir diese beiden Properties als _required_.',
          Hint: 'Das Konstrukt der Klasse sollte in etwa so aussehen:\n\n~~~objectscript\nClass Name Extends (Superklassen)\n{\n\n   Property Name As Typ(Parameter) [ Optionen ];\n   ...\n\n}\n~~~\n',
          Result:
            '~~~objectscript\nClass training.Kunde Extends (%Persistent, %Populate)\n{\n\nProperty KundenNr As %Integer(MINVAL = 1) [ Required ];\nProperty Name As %String [ Required ];\n\nStorage Default\n{\n<Data name="KundeDefaultData">\n<Value name="1">\n<Value>%%CLASSNAME</Value>\n</Value>\n<Value name="2">\n<Value>KundenNr</Value>\n</Value>\n<Value name="3">\n<Value>Name</Value>\n</Value>\n</Data>\n<DataLocation>^training.KundeD</DataLocation>\n<DefaultData>KundeDefaultData</DefaultData>\n<IdLocation>^training.KundeD</IdLocation>\n<IndexLocation>^training.KundeI</IndexLocation>\n<StreamLocation>^training.KundeS</StreamLocation>\n<Type>%Storage.Persistent</Type>\n}\n}\n~~~',
        },
        {
          Content:
            '4. Im nächsten Schritt wird die Kundenklasse um eine serielle Klasse erweitert. Diese Klasse beschreibt die Anschrift des Kunden. Definieren Sie eine Klasse `training.Adresse`. Die Klasse hat die folgenden Properties:\n   - **Ort %String**\n   - **PLZ %Integer**\n   - **Strasse %String**\n   - und erweitert **%SerialObject** und **%Populate**. \n5. Die Arbeitsweise des Datengenerators kann über den Parameter `POPSPEC` gesteuert werden.Spezifizieren Sie den Parameter `POPSPEC` für die drei Properties. Die Daten für den Ort sollen mit der Methode `City()` erzeugt werden. Für die PLZ spezifizieren Sie bitte `USZip()` und für Strasse `Street()`.',
          Result:
            '~~~objectscript\nClass training.Adresse Extends (%SerialObject, %Populate)\n{\nProperty Ort As %String(POPSPEC = "City()");\nProperty PLZ As %Integer(POPSPEC = "USZip()");\nProperty Strasse As %String(POPSPEC = "Street()");\nStorage Default\n{\n<Data name="AdresseState">\n<Value name="1">\n<Value>Ort</Value>\n</Value>\n<Value name="2">\n<Value>PLZ</Value>\n</Value>\n<Value name="3">\n<Value>Strasse</Value>\n</Value>\n</Data>\n<State>AdresseState</State>\n<StreamLocation>^training.AdresseS</StreamLocation>\n<Type>%Storage.Serial</Type>\n}\n}\n~~~',
          Hint: '',
        },
        {
          Content:
            '6. Im nächsten Schritt werden nun die Kundenklasse und die Adressklasse miteinander verknüpft. Dazu wird in der Kundenklasse eine Property **Anschrift** vom Typ **training.Adresse** definiert. \n7. Speichern und compilieren Sie die Klassen. In der nächsten Übung werden zu den Kunden Daten erzeugt und die SQL-Projektion untersucht.',
          Result:
            '~~~objectscript\nClass training.Kunde Extends (%Persistent, %Populate)\n{\nProperty KundenNr As %Integer(MINVAL = 1) [ Required ];\nProperty Name As %String [ Required ];\nProperty Anschrift As training.Adresse;\nStorage Default\n{\n<Data name="KundeDefaultData">\n<Value name="1">\n<Value>%%CLASSNAME</Value>\n</Value>\n<Value name="2">\n<Value>KundenNr</Value>\n</Value>\n<Value name="3">\n<Value>Name</Value>\n</Value>\n<Value name="4">\n<Value>Anschrift</Value>\n</Value>\n</Data>\n<DataLocation>^training.KundeD</DataLocation>\n<DefaultData>KundeDefaultData</DefaultData>\n<IdLocation>^training.KundeD</IdLocation>\n<IndexLocation>^training.KundeI</IndexLocation>\n<StreamLocation>^training.KundeS</StreamLocation>\n<Type>%Storage.Persistent</Type>\n}\n}\n~~~',
          Hint: '',
        },
        {
          Content:
            '## Aufgabe 2 _Datenerzeugung und erste Abfragen_\n\n1. Zur Erzeugung der Daten öffnen Sie ein Terminalfenster vom Menü des IRIS Cube’s in der Taskleiste\n2. Im Namespace **TRAINING** geben Sie ein:\n```bash\nTRAINING>write ##class(training.Kunde).Populate(100)\n```\n3. Welche Ausgabe erhalten Sie?',
          Result:
            'Die Populate Methode ruft den Datengenerator auf. Dieser ist der Klasse Kunde durch Erweiterung der Klasse `%Populate` hinzugefügt worden. Die Populate Methode gibt die Anzahl der erzeugten Objekte/Datensätze zurück. In unserem Beispiel gibt der aktuelle Parameter 100 an, dass 100 Kundenobjekte erzeugt werden sollen.',
          Hint: '',
        },
        {
          Content:
            '4. Überprüfen Sie, dass 100 Kunden angelegt wurden. Starten Sie dazu das System Management Portal und gehen Sie dazu in den Explorer und dann SQL. Stellen Sie sicher, dass Sie im Namespace TRAINING stehen. Zählen Sie per SQL die Anzahl der Kundendatensätze.\n5. Lassen Sie sich die Kundendatensätze anzeigen. Wie werden die Adressdaten angezeigt?',
          Result: 'Als ID',
          Hint: '',
        },
        {
          Content:
            '6. Starten Sie vom IRIS Cube die Class Reference und wechseln Sie in den Namespace TRAINING\n7. Suchen Sie die Dokumentation Ihrer Klassen. \n\nKlassen werden automatisch in der Class Reference dokumentiert. Diese Dokumentation wird dynamisch beim Aufruf erzeugt und ist somit immer aktuell. Für die Dokumentation gibt es eine spezielle Form von Kommentaren. Diese werden zeilenweise durch drei Slashs eingeleitet.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '8. Fügen Sie den Properties in der Kundenklasse Kommentare mit vorangestellten `///` hinzu.\n9. Speichern und Kompilieren Sie die Klasse und überprüfen Sie das Ergebnis in der Class Reference',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '## Aufgabe 3 _Objektzugriff in ObjectScript_\n\nIn dieser Übung lernen Sie den Objektzugriff kennen. Alle persistenten Objekte haben in der Datenbank \neine eindeutige ID bzw. OID. Diese ID wird auch nach Löschen des Objektes vom System **nicht** erneut \nvergeben.\n\nUm mit persistenten Objekten in InterSystems IRIS zu interagieren, spielen die folgenden Methoden eine \nwichtige Rolle\n\n- **%New()** Klassenmethode zur Erzeugung einer neuen in-memory Instanz der Klasse\n- **%OpenId(…)** Klassenmethode für das Öffnen von Objekten in der Datenbank\n- **%Save()** Instanz-Methode für das Speichern UND Update von Objekten\n- **%DeleteId()** Klassenmethode zum Löschen von Objekten aus der Datenbank ',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '1. Gehen Sie in das System Management Portal in den SQL Explorer und führen Sie die \nAnweisung aus.\n\n```sql\nselect * from training.Kunde \n```\n\n2. Betrachten Sie die Spalte **ID**. Hier werden die vom System vergebenen IDs angezeigt.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '3. Starten Sie ein Terminal vom IRIS Cube und benutzen Sie eine der existierenden IDs und öffnen Sie das korrespondierende Objekt mit der `%OpenId(<ID>)` Methode\n\n```objectscript\nTRAINING>set k = ##class(training.Kunde).%OpenId(1)\n```\nFalls es ein Objekt der Klasse **training.Kunde** mit der ID = 1 in der Datenbank gibt, enthält die Variable **k** anschließend eine Objektreferenz auf dieses Objekt im Memory. Auf dieses Objekt kann über diese Objektreferenz **k** zugegriffen und mit der Punktsyntax kann auf die Properties des Objektes zugegriffen werden. Z.B.:\nDer Zugriff kann sowohl lesend als auch schreibend erfolgen.\n\n```objectscript\nTRAINING>write k.Name\nZevon, Paul N.\n```\n\n4. Wie sieht der Zugriff auf die Properties des Anschriften Objektes aus?',
          Result:
            '```objectscript\nTRAINING>write k.Anschrift.Ort\nDarmstadt\n```',
          Hint: '',
        },
        {
          Content:
            '5. Ändern Sie den Namen des Kunden und speichern Sie ihn anschließend mit dem Aufruf der **%Save** Methode für dieses Objekt.\n\nDie **%Save()** Methode gibt einen Statuscode zurück, der anzeigt, ob das **%Save()** erfolgreich war oder nicht. Ein Statuscode = 1 zeigt erfolgreiches Speichern an und ein Statuscode <> 1 zeigt einen fehlgeschlagenen Speicherversuch an.\n\n6. Überprüfen Sie, ob Ihre Änderungen auch per SQL sichtbar sind.',
          Result:
            '```objectscript\nTRAINING>Set k.Name = "Smith, John H."\nTRAINING>write k.%Save()\n1\n```',
          Hint: '',
        },
        {
          Content:
            '7. Legen Sie am Terminal mithilfe der **%New()** Methode einen neuen Kunden an und speichern Sie ihn in der Datenbank',
          Result:
            '```objectscript\nTRAINING>Set newKunde = ##class(training.Kunde).%New()\nTRAINING>Set newKunde.KundenNr = 2000\nTRAINING>Set knewKunde.Name = "Mustermann, Max M."\nTRAINING>write newKunde.%Save()\n1\n```',
          Hint: '',
        },
        {
          Content:
            '## Aufgabe 4 _Eine erste Klassenmethode_\n\nIn InterSystems IRIS und in ObjectScript gibt es zwei Arten von Methoden. Klassenmethoden und Instanzmethoden. Klassenmethoden werden in anderen Umgebungen häufig als static Methoden bezeichnet. D.h. die Methode kann ohne eine konkrete Objektinstanz verwendet werden, kann aber aus diesem Grund natürlich nicht auf Properties innerhalb eines Objektes zugreifen. Es gibt in dem Moment ja kein Objekt, zu dem die Methode gehört.\n\nInstanzmethoden operieren auf einem konkreten Objekt und können dementsprechend auch auf Eigenschaften oder andere Instanzmethoden dieses Objektes zugreifen. Der Zugriff erfolgt hierbei mit der `..<Property oder Methode>` Syntax. Das heißt zwei aufeinanderfolgende .. gefolgt von dem referenzierten Property oder Methode, die aufgerufen werden soll. \n\nIn dieser Übung erstellen Sie eine erste Klassenmethode zur Erzeugung und Anlage eines neuen Kunden Objektes.',
          Hint: '',
          Result: '',
        },
        {
          Content:
            '1. Betrachten Sie den nachfolgenden Code und versuchen Sie ihn zu erklären\n\n~~~objectscript\nClassMethod CreateKunde(\n\tpKundenNr As %Integer,\n\tpName As %String,\n\tpStrasse As %String,\n\tpPlz As %Integer,\n\tpOrt As %String,\n\tOutput pId As %Integer) As %Status\n{\n\t#dim tKunde As demo.Kunde = ..%New()\n\t#dim tSc As %Status = $$$OK\n\t#dim tEx As %Exception.SystemException\n\n\ttry {\n\t\tset tKunde.KundenNr = pKundenNr\n\t\tset tKunde.Name = pName\n\t\tset tKunde.Anschrift.Strasse = pStrasse\n\t\tset tKunde.Anschrift.Ort = pOrt\n\t\t$$$ThrowOnError(tKunde.%Save())\n\t\tset pId = tKunde.%Id() \n\t}\n\tcatch tEx {\n\t\twrite !,tEx.DisplayString()\n\t\tset tSc = tEx.AsStatus() \n\t}\n\treturn tSc\n}\n~~~\n',
          Hint: '',
          Result: '',
        },
      ],
      Password: '123',
    };
    return [chapter, chapter2];
  }

  sortChaptersAlphabetically(array: Chapter[]): Chapter[] {
    return array.sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    });
  }

  getChapterByName(chapterName: string, replaceWhitespaces: boolean): Chapter {
    chapterName = chapterName.toLowerCase();
    for (let chapter of this.chapters) {
      if (replaceWhitespaces) {
        if (chapter.Title.replace(/\s/g, '-').toLowerCase() == chapterName) {
          return chapter;
        }
      } else {
        if (chapter.Title.toLowerCase() == chapterName) {
          return chapter;
        }
      }
    }
    return this.errorChapter;
  }
}
