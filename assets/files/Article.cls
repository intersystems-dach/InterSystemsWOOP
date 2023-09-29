Class Training.Article Extends (%Persistent, %XML.Adaptor, %JSON.Adaptor, %Populate)
{

Property EAN As %String(MAXLEN = 13, MINLEN = 13, POPSPEC = ".CreateEAN()");

Property ArticleDescription As %String(POPORDER = 3, POPSPEC = ".CreateArticleDescription()");

Property Presentation As %String(MAXLEN = 3, POPORDER = 4, POPSPEC = ".GetPresentation()");

Property Quantity As %Integer(POPORDER = 5, POPSPEC = ".GetQuantity()");

Property QuantityUnit As %String(POPORDER = 6, POPSPEC = ".GetUnit()");

Property BasePrice As %Numeric(MAXVAL = 20.00, MINVAL = 2.00, POPORDER = 1);

Property MarketPrice As %Numeric(POPORDER = 2, POPSPEC = ".GetMarketPrice()");

Property PlaceOfStorage As list Of %String(POPSPEC = ".GetPlaceOfStorage():3");

Index idxBezDar On (ArticleDescription, Quantity) [ Unique ];

Method AddRemovePlaceOfStorage(pPlaceOfStorage As %String(MAXLEN=1), pDelete As %Boolean) As %Status
{

    #dim tSc as %Status = $$$OK

        Try {
            Set tIdx = ..PlaceOfStorage.Find(pPlaceOfStorage)
            If 'pDelete && (tIdx="") {
                $$$ThrowOnError(..PlaceOfStorage.Insert(pPlaceOfStorage))
            }
            ElseIf pDelete && (tIdx'="") {
                Do ..PlaceOfStorage.RemoveAt(tIdx)    
            }
        }
        Catch tEx {
            Write !,tEx.DisplayString()
            Set tSc = tEx.AsStatus() 
        } 

        Return tSc
}

Method CreateArticleDescription() As %String [ Private ]
{

    Set tValues = "ABC-Pflaster,Aspirin,Thomapyrin,Ibuprophen,Muccosolvan,Voltaren"
    Set tIdx = $R($L(tValues,",")) + 1
    Return $P(tValues,",",tIdx)
}

Method GetPresentation() As %String [ Private ]
{

    Return $CASE(i%ArticleDescription,
                "ABC-Pflaster" :"PFL",
                "Muccosolvan" : "TRO",
                : "TAB"

    )
}

Method GetQuantity() As %Integer [ Private ]
{
    Return $CASE(
        i%Presentation,
            "PFL" : $P("1,3,5",",",$R(3)+1),
            : $P("10,20,50,100",",",$R(4)+1)
    )
}

Method GetUnit() As %String [ Private ]
{

    Return $CASE(
        i%Presentation,
            "TRO": "ML",
                 : "ST"
    )
}

Method GetPlaceOfStorage() As %String [ Private ]
{

    Set tPlaceOfStorage = "G,K,X,S,H"
    Set tReturn = $P(tPlaceOfStorage,",",$R($L(tPlaceOfStorage,",")+1))
    For i=1:1:3 {
        If $D(i%PlaceOfStorage(i)) && (i%PlaceOfStorage(i) = tReturn) Kill i%PlaceOfStorage(i)
    }

    Return tReturn
}

Method GetMarketPrice()
{

    Return i%BasePrice * 1.32
}

Method CreateEAN() As %String [ Private ]
{
    #dim tEx as %Exception.SystemException
    
    Try {
        Set tEan = $R(999999999999)
        For i=$L(tEan)+1:1:12 {
            Set tEan = tEan_$R(9)
        }
        For i=1:2:11 {
            Set tProd(i) = $E(tEan,i)
            Set tProd(i+1) = $E(tEan,i+1)*3 
        }
    
        Set tPruef = 0
        For i=1:1:12 {
            Set tPruef = tPruef + tProd(i) 
        }
        If tPruef#10 > 0 {
            Set tPruef = 10 - (tPruef#10)
        }
        Else {
            Set tPruef = 0
        }
    }
    Catch tEx {
        Write !,tEx.DisplayString()
        Set tPruef = 0
    }    
    Return tEan_tPruef
}

}
