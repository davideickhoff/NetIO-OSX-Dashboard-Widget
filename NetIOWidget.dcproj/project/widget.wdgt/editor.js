render = function(json) {
    var canvas = $("#render_area")
    var page_index = 0;
    $.each(json["configuration_iphone"], function(index, page) { 
        page_button = $("<div class='page_button' id='page_button_"+String(index)+"' style='left:"+index*64+"px;'><div>");
        page_button.append("<img class='page_button_background' src='Images/shape_rect_btn.png' alt=''/>");
        page_button.append("<div class='page_button_label'>"+page["label"]+"</div>");
        page_button.mouseup(function(){
            $(this).find(".page_button_background").attr("src","Images/shape_rect_btn.png");
        }).mousedown(function(){
            $(this).find(".page_button_background").attr("src","Images/shape_rect_btn_pressed.png");
        });

        canvas.append(page_button)
        page_div = $("<div class='page' id='page_"+String(index)+"'></div>");
        var button_index = 0;
        $.each(page["buttons"], function(index, button) { 
            dimensions = "left:"+button["left"]+"px; top:"+button["top"]+"px; width:"+button["width"]+"px; height:"+button["height"]+"px;";
            button_div = $("<div class='button' style='"+dimensions+" line-height:"+button["height"]+"px;' p_index="+page_index+" b_index="+button_index+"><div>");
            button_div.append("<img class='button_bg_image' style='width:"+button["width"]+"px; height:"+button["height"]+"px;' src='Images/shape_"+button["shape"]+"_btn.png' alt=''/>");
            button_div.append("<div class='button_label' style='width:"+button["width"]+"px; height:"+button["height"]+"px;'>"+button["label"]+"</div>");
            if(button["icon"]!="")
            {
                button_div.append("<img class='button_icon_image' style='height:"+button["height"]*0.45+"px; margin-top:"+button["height"]*0.255+"px;' src='Images/icon_"+button["icon"]+".png' alt=''/>"); 
            }
            
            
            button_div.mouseup(function(){
                button_json = json["configuration_iphone"][parseInt($(this).attr("p_index"))]["buttons"][parseInt($(this).attr("b_index"))];
                $(this).find(".button_bg_image").attr("src","Images/shape_"+button_json["shape"]+"_btn.png");
                send(button_json["sends"][0]);
            }).mousedown(function(){
                button_json = json["configuration_iphone"][parseInt($(this).attr("p_index"))]["buttons"][parseInt($(this).attr("b_index"))];
                $(this).find(".button_bg_image").attr("src","Images/shape_"+button_json["shape"]+"_btn_pressed.png");
            });

            
            page_div.append(button_div);
            button_index = button_index + 1;
        });
        page_index = page_index + 1;
        
        page_div.hide();
        canvas.append(page_div);
        $("#page_button_"+String(index)).click(function() {
            $(".page").fadeOut(300);
            $("#page_"+String(index)).fadeIn(300);
        });
    });
    $("#page_0").fadeIn(300);
}    

