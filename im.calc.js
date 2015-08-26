$(document).ready(function() {
    var income = 0;
    $( '#monthly div.slide' ).each(function() {
      // read initial values from markup and remove that
      var cat = $(this).attr('title');
      var value = parseInt( $( this ).text(), 10 );
      var monthly = 0;
      $( this ).empty().slider({
        value: 0,
        min: 0,
        max: value,
        step: 10,
        slide: function( event, ui ) {
            $( '#' + cat ).val( ui.value );
          },
        change: function( event, ui ) {
            monthly = 0;
            $('.monthly').each(function(){
                $('.monthly').val(function(index, value) {
                    return value
                        .replace(/,/, '')
                    ;
                });
                parseInt(this);
                monthly += Number($(this).val());
                $('#mExpenses').val(monthly);
                $('#mExpenses,.monthly').val(function(index, value) {
                return value
                    .replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;
            });
            });
        }
      });
    });
    $( '#annIncome' ).slider({
        value: 0,
        min: 0,
        max: 300000,
        step: 1000,
        slide: function( event, ui ) {
            $( '#income' ).val( ui.value );
          },
        change: function( event, ui ) {
            $('#income').val(function(index, value) {
                    return value
                        .replace(/,/, '')
                    ;
                });
            income = $('#income').val();
            var mIncome = income / 12;
            $('#mIncome').val(mIncome.toFixed(0));
            var retirement = $('#rAge').val() - $('#age').val();
            var earnings = income * retirement;
            $('#lIncome').val(earnings);
            $('#lIncome,#mIncome,#income').val(function(index, value) {
                return value
                    .replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;
            });
        }
    });
    $('input#age,input#rAge').change( function() {
        var retirement = $('#rAge').val() - $('#age').val();
        var earnings = income * retirement;
        if($('input#age').val() >= 1 && $('input#rAge').val() >= $('input#age').val()) {
            $('#lIncome').val(earnings);
            $('#lIncome').val(function(index, value) {
                return value
                    .replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;
            });
        }else {
            null;   
        }
    });
});