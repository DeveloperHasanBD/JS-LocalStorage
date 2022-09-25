

let id;
display_data();
function manage_data() {
    let user_name = $("#user_name").val();
    let user_phone = $("#user_phone").val();

    if (user_name && user_phone) {
        if (id == undefined) {
            let arr = JSON.parse(localStorage.getItem('crud'));
            if (arr == null) {
                let data = [
                    {
                        'user_name': user_name,
                        'user_phone': user_phone,
                    }
                ];
                localStorage.setItem('crud', JSON.stringify(data));
                $("#user_name").val('');
                $("#user_phone").val('');
                $("#msg").html("Data added");
            } else {
                arr.push({
                    'user_name': user_name,
                    'user_phone': user_phone,
                });
                localStorage.setItem('crud', JSON.stringify(arr));
                $("#user_name").val('');
                $("#user_phone").val('');
                $("#msg").html("Data added");
            }
        } else {
            let get_data = JSON.parse(localStorage.getItem('crud'));
            get_data[id] = {
                'user_name': user_name,
                'user_phone': user_phone,
            };
            localStorage.setItem('crud', JSON.stringify(get_data));
            $("#msg").html("Data updated");
        }
        display_data();
    } else {
        $("#msg").html("Please insert data");
    }
}

function display_data() {
    let get_data = JSON.parse(localStorage.getItem('crud'));
    let data_count = get_data.length;
    if (data_count > 0) {
        let html = '';
        let num = 1;
        for (i = 0; i < data_count; i++) {
            html += `<tr>
                        <td>${num++}</td>
                        <td>${get_data[i].user_name}</td>
                        <td>${get_data[i].user_phone}</td>
                        <td>
                            <a href="javascript:void(0)" onclick="edit_user(${i})">Edit</a>
                            <a href="javascript:void(0)" onclick="delete_user(${i})">Delete</a>
                        </td>
                    </tr>`;
        }
        $("#set_users_data").html(html);
    }
}

function edit_user(rid) {
    id = rid;
    let get_data = JSON.parse(localStorage.getItem('crud'));
    $("#user_name").val(get_data[id].user_name);
    $("#user_phone").val(get_data[id].user_phone);
}

function delete_user(rid) {
    let get_data = JSON.parse(localStorage.getItem('crud'));
    get_data.splice(rid, 1);
    localStorage.setItem('crud', JSON.stringify(get_data));
    display_data();
}
