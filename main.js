
let id;
display_data();
function manage_data() {
    let user_name = $("#user_name").val();
    let user_phone = $("#user_phone").val();
    $("#msg").html('');
    if (user_name && user_phone) {
        if (id === undefined) {
            let arr = JSON.parse(localStorage.getItem('crud'));
            if (arr == null) {
                let data = [
                    {
                        'name': user_name,
                        'phone': user_phone,
                    }
                ];
                localStorage.setItem('crud', JSON.stringify(data));
                $("#user_name").val('');
                $("#user_phone").val('');
            } else {
                arr.push({
                    'name': user_name,
                    'phone': user_phone,
                });
                localStorage.setItem('crud', JSON.stringify(arr));
                $("#user_name").val('');
                $("#user_phone").val('');
            }
        } else {
            let get_users = JSON.parse(localStorage.getItem('crud'));
            get_users[id] = { 'name': user_name, 'phone': user_phone };
            localStorage.setItem('crud', JSON.stringify(get_users));
        }
        display_data();
    } else {
        $("#msg").html('Please filup the form correctly');
    }
}

function display_data() {
    let get_data = JSON.parse(localStorage.getItem('crud'));
    let user_count = get_data.length;
    let html = '';
    if (user_count > 0) {
        let num = 1;
        for (i = 0; i < user_count; i++) {
            html += `<tr>
                        <td>${num++}</td>
                        <td>${get_data[i].name}</td>
                        <td>${get_data[i].phone}</td>
                        <td>
                            <a href="javascript:void(0)" onclick="edit_user(${i})">Edit</a>
                            <a href="javascript:void(0)" onclick="delete_user(${i})"">Delete</a>
                        </td>
                    </tr>`;
        }
        $("#set_users_data").html(html);
    }
}

function edit_user(rid) {
    id = rid;
    let get_users = JSON.parse(localStorage.getItem('crud'));
    $("#user_name").val(get_users[rid].name);
    $("#user_phone").val(get_users[rid].phone);
}

function delete_user(rid) {
    let all_users = JSON.parse(localStorage.getItem('crud'));
    all_users.splice(rid, 1);
    localStorage.setItem('crud', JSON.stringify(all_users));
    display_data();
}