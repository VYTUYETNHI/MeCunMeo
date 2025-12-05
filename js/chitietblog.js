document.addEventListener("DOMContentLoaded", function () {    
    const form = document.querySelector(".bg-light form");    
    const commentList = document.querySelector(".mb-5:nth-of-type(2)");

    const avatarList = [
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=7",
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5",
        "https://i.pravatar.cc/150?img=8",
    ];

    function getRandomAvatar() {
        return avatarList[Math.floor(Math.random() * avatarList.length)];
    }

    // Thêm bình luận mới
    form.addEventListener("submit", function (e) {        
        e.preventDefault();          
        const name = form.querySelector("input[placeholder='Tên của bạn ']").value.trim();        
        const email = form.querySelector("input[placeholder=' Email']").value.trim();        
        const comment = form.querySelector("textarea").value.trim();          
        if (!name || !email || !comment) {            
            alert("Vui lòng nhập đầy đủ Tên, Email và Nội dung bình luận!");            
            return;        
        }          
        const today = new Date();        
        const dateStr = today.toLocaleDateString("vi-VN");
        const randomAvatar = getRandomAvatar();

        const newComment = document.createElement("div");        
        newComment.classList.add("d-flex", "mb-4");          
        newComment.innerHTML = `            
            <img src="${randomAvatar}" class="img-fluid"
                 style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover;">            
            <div class="ps-3">                
                <h6><a href="#">${name}</a> <small><i>${dateStr}</i></small></h6>                
                <p>${comment}</p>                
                <button class="btn btn-sm btn-light btn-reply">Reply</button>
                <div class="reply-container ms-4"></div>
            </div>        
        `;          
        commentList.appendChild(newComment);        
        form.reset();    
    });

    // Chức năng Reply
    commentList.addEventListener("click", function(e) {
        if (e.target.classList.contains("btn-reply")) {
            const parent = e.target.parentElement;
            const container = parent.querySelector(".reply-container");

            // Tạo form reply nếu chưa có
            if (!parent.querySelector(".reply-form")) {
                const replyForm = document.createElement("form");
                replyForm.classList.add("reply-form", "mt-2");
                replyForm.innerHTML = `
                    <input type="text" class="form-control mb-2" placeholder="Tên của bạn" style="height: 40px;">
                    <input type="email" class="form-control mb-2" placeholder="Email" style="height: 40px;">
                    <textarea class="form-control mb-2" rows="3" placeholder="Reply"></textarea>
                    <button class="btn btn-primary btn-sm" type="submit">Gửi Reply</button>
                `;
                parent.appendChild(replyForm);

                replyForm.addEventListener("submit", function(ev) {
                    ev.preventDefault();
                    const replyName = replyForm.querySelector("input[type='text']").value.trim();
                    const replyEmail = replyForm.querySelector("input[type='email']").value.trim();
                    const replyText = replyForm.querySelector("textarea").value.trim();

                    if (!replyName || !replyEmail || !replyText) {
                        alert("Vui lòng nhập đầy đủ Tên, Email và Nội dung Reply!");
                        return;
                    }

                    const today = new Date();        
                    const dateStr = today.toLocaleDateString("vi-VN");
                    const randomAvatar = getRandomAvatar();

                    const replyDiv = document.createElement("div");
                    replyDiv.classList.add("d-flex", "mt-2");
                    replyDiv.innerHTML = `
                        <img src="${randomAvatar}" class="img-fluid"
                            style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                        <div class="ps-3">
                            <h6><a href="#">${replyName}</a> <small><i>${dateStr}</i></small></h6>
                            <p>${replyText}</p>
                            <button class="btn btn-sm btn-light btn-reply">Reply</button>
                            <div class="reply-container ms-4"></div>
                        </div>
                    `;
                    container.appendChild(replyDiv);
                    replyForm.reset(); // giữ form để gửi tiếp
                });
            }
        }
    });

    // Mua ngay
    const buyNowBtn = document.querySelector(".bg-light a.btn.btn-primary");
    if (buyNowBtn) {
        buyNowBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "chocun.html";
        });
    }
});
