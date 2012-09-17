render = function(json) {
    var canvas = $("#render_area")
    var pageButtons = $("<div id='page-buttons'></div>");
    var page_index = 0;
    $.each(json["pages"], function(index, page) { 
        
        var page_button = $("<div class='shape_rect button page_button' id='page_button_"+String(index)+"' style='left:"+index*64+"px;'><div>");
        page_button.append("<div class='page_button_label'>"+page["label"]+"</div>");

        page_button.click(function() {
            $(".page").fadeOut(300);
            $("#page_"+String(index)).fadeIn(300);
        });


        pageButtons.append(page_button)
        var page_div = $("<div class='page' id='page_"+String(index)+"'></div>");
        var button_index = 0;
        $.each(page["items"], function(index, button) { 
            dimensions = "left:"+button["left"]+"px; top:"+button["top"]+"px; width:"+button["width"]+"px; height:"+button["height"]+"px;";

            if (button["type"]=="button") {
            button_div = $("<div class='button shape_"+button["shape"]+"' style='"+dimensions+" line-height:"+button["height"]+"px;' p_index="+page_index+" b_index="+button_index+"><div>");
            button_div.append("<div class='button_label' style='width:"+button["width"]+"px; height:"+button["height"]+"px;'>"+button["label"]+"</div>");
            if(button["icon"]!="")
            {
                button_div.append("<img class='button_icon_image' style='height:"+button["height"]*0.45+"px; margin-top:"+button["height"]*0.255+"px;' src='Images/icon_"+button["icon"]+".png' alt=''/>"); 
            }
            
            
            button_div.mousedown(function(){
                button_json = json["pages"][parseInt($(this).attr("p_index"))]["items"][parseInt($(this).attr("b_index"))];
                send(button_json["sends"][0]);
            });
            page_div.append(button_div);


            } else if (button["type"]=="label") {
                item = button;
                item_div = $("<div class='label' style='"+dimensions+" line-height:"+item["height"]+"px;' p_index="+page_index+" b_index="+button_index+"><div>");
                item_div.append("<div class='label_text' style='width:"+button["width"]+"px; height:"+item["height"]+"px;'>"+item["text"]+"</div>");
                page_div.append(item_div);
            }
            
            button_index = button_index + 1;
        });
        page_index = page_index + 1;
        
        page_div.hide();
        canvas.append(page_div);
    });
    canvas.append(pageButtons);
    $("#page_0").fadeIn(300);
}    

