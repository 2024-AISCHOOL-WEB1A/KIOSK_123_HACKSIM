(function(){
	$(".aside_menu li").click(function() {
		if ( $(this).hasClass("disable") ) {
		} else {
			var idx = $(this).index();
			$(".aside_menu li").removeClass("active");
			$(this).addClass("active");
			$(".container").removeClass("active");
			$(".container").eq(idx).addClass("active");
		}
	});

	// 모달 - 열기
	$(".op_modal").click(function() {
		$("#modal").addClass('active');
		$("body").addClass('disable');
	});
	
	// 모달 - 닫기
	$(".cs_modal").click(function() {
		$("#modal").removeClass('active');
		$(".md_cont").removeClass('active');
		$(".md_cont.tab1").addClass('active');
		$(".md_coment").text('세트로 주문하시겠습니까?').attr('class', 'md_coment');
	});

	// 모달 - 메뉴 선택 
	$(".md_cont.tab1 li a").click(function() {
		$(".md_cont.tab1").removeClass('active');
		$(".md_cont.tab2").addClass('active');
		$(".md_coment").text('');
	});
	$(".md_cont.tab2 li a").click(function() {
		$(".md_cont.tab2").removeClass('active');
		$(".md_cont.tab3").addClass('active');
		$(".md_coment").text('세트메뉴 사이드를 선택하세요').addClass('lg');
	});
	$(".md_cont.tab3 li a").click(function() {
		$(".md_cont.tab3").removeClass('active');
		$(".md_cont.tab4").addClass('active');
		$(".md_coment").text('세트메뉴 음료를 선택하세요').removeClass('lg');;
	});
	$(".md_cont.tab4 li a").click(function() {
		$(".md_cont.tab4").removeClass('active');
		$(".md_cont.tab5").addClass('active');
		$(".md_coment").text('세트메뉴 디저트를 선택하세요');
	});
	$(".md_cont.tab4 li a").click(function() {
		$(".md_cont.tab5").removeClass('active');
		$(".md_cont.tab1").addClass('active');
		$(".md_coment").text('세트로 주문하시겠습니까?');
		$("#modal").removeClass('active');
		$(".modal_final").addClass('active');
	});

	$(".md_card_btn_close").click(function() {
		$(".modal_final").removeClass('active');
	});

	(function(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
	})();

})();
