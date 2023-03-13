let engData;
let navCnt = 0;
let dataCnt = 0;
let totalPage = 1;
let page = 1;

function appendNavClass() {
    for(class1 in engData) {
        var appendItem = `<li class="mb-1"><button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapse${navCnt}" aria-expanded="false"> <span class="ms-1">${class1}</span> </button>
        <div class="collapse" id="collapse${navCnt}">
                                <ol class="btn-toggle-nav list-unstyl fw-normal pb-1 small" id="subClass${navCnt}">
                                </ol>
        </li>`;
        $("#navClass").append(appendItem);
        
        for(class2 in engData[class1]) {
            var appendItem = `<li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded" onclick="onClickNav('${class1}', '${class2}', 1);">${class2}</a></li>`;
            $("#subClass"+navCnt).append(appendItem);
            dataCnt += 1;
        }
        
        navCnt += 1;
    }
}

function onClickNav(c1, c2, contentIdx) {
    let pageCnt = 1;
    page = contentIdx;
    
    initForm();
    
    for(class1 in engData) {
        for(class2 in engData[class1]) {
            for(class3 in engData[class1][class2]) {
                
                if(class1 == c1 && class2 == c2 && pageCnt == contentIdx) {
                    $("#breadClass1").text(class1);
                    $("#breadClass2").text(class2);
                    $("#kor").val(engData[class1][class2][class3]['kor']);
                    $("#eng").val(engData[class1][class2][class3]['eng']);
                }
                
                if(class1 == c1 && class2 == c2) {
                    addPage(class1, class2, pageCnt, contentIdx);
                    totalPage = pageCnt;
                    pageCnt += 1;
                }
            }

        }
    }
    
    
}

function movePage(direction) {
    let changePage = page + direction;

    if(changePage > 0 && changePage <= totalPage) {
        onClickNav($("#breadClass1").text(), $("#breadClass2").text(), changePage);
    }
}

function addPage(class1, class2, pageCnt, nowPage) {
    let active = "";
    
    if(pageCnt == nowPage) {
        active = "active";
    }
    
    var appendItem = `<li class="page-item ${active}"><a href="#" class="page-link" onclick="onClickNav('${class1}', '${class2}', ${pageCnt});">${pageCnt}</a></li>`;
    
    $("#pagination").append(appendItem);
}

function initForm() {
    $("#kor").val("");
    $("#eng").val("");
    $("#answer").val("");
    $("#correct").text("0.00%");
    $("#eng").attr("type", "password");
    $("#pagination").text("");
}

function answerKeyEvent() {
    let correctCnt = 0;
    const eng = $("#eng").val();
    const answer = $("#answer").val();
    
    const engArray = [...eng];
    const answerArray = [...answer];
    
    engArray.forEach(function(item, index) {
        //console.log(item, index);
        if(item == answerArray[index]) {
            correctCnt += 1;
        }
    });
    
    $("#correct").text(Math.round((correctCnt / engArray.length * 100) * 100) / 100 + "%");
    
    if(window.event.keyCode == 13) {
        correctCheck();
    }
}

function correctCheck() {
    $("#eng").attr("type", "input");
}

window.addEventListener('keydown', function(event) {
    if(event.defaultPrevented) {
        return;
    }
    
    switch(event.key) {
        case "Down":
        case "ArrowDown":
                    break;
        case "Up":
        case "ArrowUp":
                    break;
        case "Left":
        case "ArrowLeft":
                    movePage(-1);
                    break;
        case "Right":
        case "ArrowRight":
                    movePage(1);
                    break;                    
    }
    
    //event.preventDefault();
});

$(document).ready(function() {
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
    //console.log(urlParams.get('class1'));
        
    YAML.load('./js/eng-data.yml', function(result) {
        engData = result;
        appendNavClass();
    });


})
