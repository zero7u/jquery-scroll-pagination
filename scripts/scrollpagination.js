/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
*/

(function($) {


 $.fn.scrollPagination = function(options) {
  	
		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = obj; 
	 	}
		opts.scrollTarget = target;

		return this.each(function() {
		  $.fn.scrollPagination.init($(this), opts);
		});

  };
  
  $.fn.stopScrollPagination = function(){
	  return this.each(function() {
	 	$(this).attr('scrollPagination', 'disabled');
	  });

  };
  
  $.fn.scrollPagination.loadContent = function(obj, opts){
	 var target = opts.scrollTarget;
	 var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(obj).height() - $(target).height();
	 if (mayLoadContent && !opts.loading){
		 if (opts.beforeLoad != null){
			opts.beforeLoad();
		 }
		 opts.loading = true;
		 $.ajax({
			  type: 'POST',
			  url: opts.url,
			  data: {offset: opts.offset, limit: opts.limit},
			  success: function(data){
			  	opts.loading = false;
				if (opts.afterLoad != null){
					opts.afterLoad(data);	
				}
			  	if (data) {
					$(obj).append(data); 
					opts.offset += opts.limit;
			  	} else {
			  		$(obj).stopScrollPagination();
			  	}
			  },
			  dataType: 'html'
		 });
	 }

  };
  
  $.fn.scrollPagination.init = function(obj, opts){
	 var target = opts.scrollTarget;

	 opts.url = $(obj).data('fetch-url');
	 opts.offset = $(obj).children().length;
	 if (opts.offset < opts.limit) return;

	 $(obj).attr('scrollPagination', 'enabled');

	 $(target).scroll(function(event){
		if ($(obj).attr('scrollPagination') == 'enabled'){
	 		$.fn.scrollPagination.loadContent(obj, opts);		
		}
		else {
			event.stopPropagation();	
		}
	 });

	 $.fn.scrollPagination.loadContent(obj, opts);

 };

 $.fn.scrollPagination.defaults = {
		'url' : null,
		'offset' : 0,
		'limit' : 20,
		'beforeLoad': null,
		'afterLoad': null	,
		'scrollTarget': null,
		'heightOffset': 0,
		'loading': false
 };	
})( jQuery );
