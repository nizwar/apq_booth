
let email = window.localStorage.getItem('email');
function AddPointBooth(id_brand) {
    
    // let url = "https://yp9xxu67k0.execute-api.ap-southeast-1.amazonaws.com/Prod/points/change";
    let url = "https://bmu5dbe26i.execute-api.ap-southeast-1.amazonaws.com/prod/points/change";
    
    // let data = JSON.stringify({
    //     "email": email,
    //     "action": "+",
    //     "id_brand": id_brand!=null?id_brand:0,
    //     "point": "20"
    // });
    
    let data = JSON.stringify({
        "email":"halfknight27@gmail.com",
        "action": "+",
        "id_brand": "TR90",
        "point": "27"
    })
    
    jQuery.ajax({
        url: url,
        headers: {},
        crossDomain: true,
        method: 'POST',
        data: data
    })
        .done(function (respone) {
            if (respone.status === true) {
                console.log('poin added : '+respone);
            } else {
                console.log('poin cant added : '+respone);
            }

        })
        .fail(function (jqXHR, textStatus, errorThrown, err) {
            console.error(err);
            console.log('Something Wrong : ',jqXHR, textStatus, errorThrown)
        });
}

function getTotalPoint(){
    
    let url = "https://bmu5dbe26i.execute-api.ap-southeast-1.amazonaws.com/prod/points/log"
    let data = JSON.stringify({
        "email":email,
    })
    
    jQuery.ajax({
        url: url,
        headers: {},
        crossDomain: true,
        method: 'POST',
        data: data
    })
        .done(function (respone) {
            if (respone.status === true) {
                $('#totalPoint').html(respone.total_point)
                console.log('poin added : '+respone);
            } else {
                
                $('#totalPoint').html('0')
                console.log('poin cant added : '+respone);
            }

        })
        .fail(function (jqXHR, textStatus, errorThrown, err) {
            console.error(err);
            $('#totalPoint').html('0')
            console.log('Something Wrong : ',jqXHR, textStatus, errorThrown)
        });
    
}