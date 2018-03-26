/*
 *  This is a separate AJAX (very basic) client side application 
 *  running on same domain calling REST back (so no CORS nedded)
 *  
 *  This is ES5 
 *  
 *  NOTE: Copied jquery.min.js from node_modules to here
 *  
 */
// jQuery document reade function (so that the DOM is fully constructed)
$(function() {
    $("#get").on("click", rest.get);
    $("#getById").on("click", rest.getById);
    $("#add").on("click", rest.add);
    $("#delete").on("click", rest.delete);
    $("#clear").on("click", rest.clear);
    
    $("#addBtn").on("click", rb.add);
    $("#saveBtn").on("click", rb.edit);
    $("#deleteBtn").on("click", rb.delete);
});

// rest is singe JS object returned from an called ananymous function
// see the return value below.
var rest = (function() {
   
    var baseURL = "http://localhost:8080/ws4/rest/author/"; 
    return {
        get: function() {
            console.log("Before ajax get call");
            $.get(baseURL).then(function(json) {
                console.log(json);
                $("#success").html(JSON.stringify(json));
            }).fail( // This is jQuery, standard Promise is catch()
                    function(error) { // Error
                $("#error").html(JSON.stringify(error));
            });
            console.log("After ajax get call");
        },
        getById: function() {
            var id = $("#id").val();
            $.get(baseURL + id).then(function(json) {
                console.log(json);
                $("#success").html(JSON.stringify(json));
            }).fail(function(error) { // Error
                $("#error").html(JSON.stringify(error));
            });
            console.log("After ajax get call");
        },
        delete: function() {
            var id = $("#id").val();
            $.ajax({
                url: baseURL + id,
                type: 'DELETE',
                success: function() {
                    console.log("Delete " + id);
                }
            });
        },
        add: function() {
            var name = $("#name").val();
            console.log(name);
            var id = name.substring(0,2).toUpperCase();
            var newAuthor = {id: id, fname: name, lname:name, email: name + "@post" };
            $.post(baseURL, newAuthor).fail(function(error) {
            //$.post(baseURL, {name: name}).fail(function(error) {
                $("#error").html(JSON.stringify(error));
            });
        },
        clear: function() {
            $("#success").empty();
            $("#error").empty();
        }
    };
})();

var rb = (function(){
    var baseURL = "http://localhost:8080/ws4/rest/book/";
    
    return{
        get: function(){
            $.get(baseURL).then(function(json) {
                var htmlStr = "";
                $.each(json, function(i, item) {
                    htmlStr += "<li>isbn: " + item["isbn"] + " | genre: " + item["genre"] + " | price:" + item["price"] + " | title: " + item["title"] + "   <a href='edit.xhtml?isbn=" + item["isbn"] + "'>Ändra</a>" + "   <a href='delete.xhtml?isbn=" + item["isbn"] + "'>Ta bort</a>" + "</li>";
                });
                console.log(json);
                $("#bookList").html(htmlStr);
            }).fail( // This is jQuery, standard Promise is catch()
                    function(error) { // Error
                //$("#error").html(JSON.stringify(error));
            });
        },
        getByIsbn: function() {
            var isbn = $("#isbn").val();
            $.get(baseURL + isbn).then(function(json) {
                $("#genre").val(json["genre"]);
                $("#price").val(json["price"]);
                $("#title").val(json["title"]);
            }).fail(function(error) { // Error
                $("#error").html(JSON.stringify(error));
            });
            console.log("After ajax get call");
        },
        add: function() {
            var isbn = $("#isbn").val();
            var genre = $("#genre").val();
            var price = $("#price").val();
            var title = $("#title").val();
            
            var newBook = {isbn: isbn, genre: genre, price: price, title: title};
            
            $.post(baseURL, newBook).then(function(json){
                location.reload();
            }).fail(function(error){
                console.log(JSON.stringify(error));
            });
        },
        edit: function(){
            var isbn = $("#isbn").val();
            var genre = $("#genre").val();
            var price = $("#price").val();
            var title = $("#title").val();
            
            var newBook = {isbn: isbn, genre: genre, price: price, title: title};
            
            $.post(baseURL + "edit", newBook).then(function(json){
                location.replace("list.xhtml");
            }).fail(function(error){
                console.log(JSON.stringify(error));
            });
        },
        delete: function() {
            var isbn = $("#isbn").val();
            $.ajax({
                url: baseURL + isbn,
                type: 'DELETE',
                success: function() {
                    location.replace("list.xhtml");
                }
            });
        }
    };
})();

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};