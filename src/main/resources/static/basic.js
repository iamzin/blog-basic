$(document).ready(function () {
    setTimeout(function () {
        scrollTo(0, 0);
    }, 100);
    getPosts();
    $('#post-box').hide();
})

function getPosts() {
    $('#cards-box').empty();
    $.ajax({
        type: 'GET',
        url: '/api/post',
        success: function (response) {
            for (let i=0; i<response.length; i++) {
                let post = response[i];
                let id = post.id;
                let username = post.username;
                let title = post.title;
                let contents = post.contents;
                let modifiedAt = post.modifiedAt;
                addHTML(id, username, title, contents, modifiedAt);
            }
        }
    })
}

function addHTML(id, username, title, contents, modifiedAt) {
    let tempHtml = `<div id="card" class="card">
                        <div class="card-header">
                            <a href="detail?${id}"><h5 id="${id}-title" class="card-title">${title}</h5></a>
                        </div>
                        <!-- <h5> 안에 <span class="post-new badge rounded-pill bg-warning text-dark">new</span> -->
                        <div class="card-body">
                            <p id="${id}-contents" class="card-text post-contents">${contents}</p>
                        </div>
                        <div class="card-footer">
                            <span id="${id}-username" class="post-username badge rounded-pill bg-secondary">${username}</span>
                            <span id="${id}-date" class="post-date">&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;${modifiedAt}</span>
                        </div>
                        <hr class="card-hr">
                    </div>`
    $('#cards-box').append(tempHtml);

}

function cantPost() {
    alert("로그인이 필요합니다.");
    window.location.href = "/user/login";
}

function postBtn() {
    scrollTo(0, 120);
    $('#cards-box').hide();
    $('#post-btn').hide();
    $('#post-box').show();
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

function writePost() {
    let username = $('#username').val();
    let title = $('#title').val();
    if (isValidTitle(title) == false) {
        return;
    }
    let contents = $('#contents').val();
    if (isValidContents(contents) == false) {
        return;
    }
    let data = {'username': username, 'title':title, 'contents': contents};

    $.ajax({
        type: "POST",
        url: "/api/post",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('새로운 항해 일지가 저장되었습니다.');
            window.location.reload();
        }
    });
}

function cancelPost() {
    window.location.reload();
}
