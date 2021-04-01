$(document).ready(function () {
    scrollTo(0, 120);
    let id = window.location.search.split("?")[1];
    getDetail(id);
    $('#edit-box').hide();
    $('#edit-btn').hide();
    inputReply();
})

function getDetail(id) {
    let idx = id;
    $.ajax({
        type: 'GET',
        url: `/api/detail/${idx}`,
        success: function (response) {
            let id = response["id"];
            let username = response["username"];
            let title = response["title"];
            let contents = response["contents"];
            let modifiedAt = response["modifiedAt"];
            addHTML(id, username, title, contents, modifiedAt);
            addEditHTML(id, username, title, contents, modifiedAt);
        }
    })
}

function addHTML(id, username, title, contents, modifiedAt) {
    let tempHtml = `<div id="card" class="card">
                        <hr class="card-hr">
                        <div class="card-header">
                            <h5 id="${id}-title" class="card-title">${title}</h5>
                        </div>
                        <div class="card-footer post-detail">
                            <span id="${id}-username" class="post-username badge rounded-pill bg-secondary">${username}</span>
                            <span id="${id}-date" class="post-date">&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;${modifiedAt}</span>
                        </div>
                        <div class="card-body detail-contents">
                            <p id="${id}-contents" class="card-text detail-post-contents">${contents}</p>
                        </div>
                        <hr class="card-hr">
                    </div>`
    $('#cards-box').append(tempHtml);
}

function addEditHTML(id, username, title, contents, modifiedAt) {
    let tempHtml = `<form class="post-box">
                        <div>
                            <div class="card-footer edit-detail">
                                <span id="edit-username" class="edit-username badge rounded-pill bg-secondary">${username}</span>
                                <span id="edit-date" class="edit-date">&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;${modifiedAt}</span>
                            </div>
                        </div>
                        <label>
                            <p class="bold label-txt">TITLE</p>
                            <input id="edit-title" type="text" class="input" value="${title}">
                            <div class="line-box">
                                <div class="line"></div>
                            </div>
                        </label>
                        <label>
                            <p class="bold label-txt">CONTENTS</p>
                            <textarea id="edit-contents" type="text" class="input">${contents}</textarea>
                            <div class="line-box">
                                <div class="line"></div>
                            </div>
                        </label>
                    </form>`
    $('#edit-box').append(tempHtml);
}

function editBtn() {
    scrollTo(0, 120);
    $('#post-box').hide();
    $('#edit-box').show();
    $('#edit-btn').show();
    inputAction();
}

function inputAction() {
    $('.input').focus(function () {
        $(this).parent().find(".label-txt").addClass('label-active');
    });

    $(".input").focusout(function () {
        if ($(this).val() == '') {
            $(this).parent().find(".label-txt").removeClass('label-active');
        }
    });

    $('.name-input').focus(function () {
        $(this).parent().find(".label-txt").addClass('label-active');
    });

    $(".name-input").focusout(function () {
        if ($(this).val() == '') {
            $(this).parent().find(".label-txt").removeClass('label-active');
        }
    });
}

function inputReply() {
    $('.input').focus(function () {
        $(this).parent().find(".label-txt").addClass('label-active');
    });

    $(".input").focusout(function () {
        if ($(this).val() == '') {
            $(this).parent().find(".label-txt").removeClass('label-active');
        }
    });
}

function isValidTitle(title) {
    if (title == '') {
        alert('제목을 입력해 주세요.');
        return false;
    }
    if (title.trim().length > 100) {
        alert('공백 포함 100자 이하로 입력해 주세요.')
        return false;
    }
    return true;
}


function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해 주세요.');
        return false;
    }
    if (contents.trim().length > 500) {
        alert('공백 포함 500자 이하로 입력해 주세요.')
        return false;
    }
    return true;
}

function saveEdit() {
    let id = window.location.search.split("?")[1];
    let username = $('.edit-username').text();
    let title = $('#edit-title').val();
    if (isValidTitle(title) == false) {
        return;
    }
    let contents = $('#edit-contents').val();
    if (isValidContents(contents) == false) {
        return;
    }
    let data = {'username': username, 'title':title, 'contents': contents};
    console.log(data, id);
    $.ajax({
        type: "PUT",
        url: `/api/detail/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('항해 일지를 수정하였습니다.');
            window.location.reload();
        }
    });
}

function deletePost() {
    let id = window.location.search.split("?")[1];
    $.ajax({
        type: "DELETE",
        url: `/api/detail/${id}`,
        success: function (response) {
            alert('항해 일지를 삭제하였습니다.');
            window.location.href="/";
        }
    });
}

function backBtn() {
    window.location.href="/";
}

function cancelEdit() {
    window.location.reload();
}

// reply
function writeReply() {
    let replyUsername = $('#username').val();
    let reply = $('#reply').val();
    if (isValidReply(reply) == false) {
        return;
    }
    let data = {'username': username, 'reply':reply};

    $.ajax({
        type: "POST",
        url: "/api/reply",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            window.location.reload();
        }
    });
}
