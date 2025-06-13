document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('site-bgm');
    const bgmToggleButton = document.getElementById('bgm-toggle-button');
    let isPlaying = false;

    bgmToggleButton.addEventListener('click', () => {
        if (isPlaying) {
            bgm.pause();
            bgmToggleButton.textContent = '♪ BGM OFF'; // ボタンのテキストを変更
        } else {
            bgm.play().catch(e => {
                console.error("BGMの自動再生がブロックされました:", e);
                alert("BGMの再生にはユーザー操作が必要です。"); // 必要に応じてユーザーに通知
            });
            bgmToggleButton.textContent = '♪ BGM ON'; // ボタンのテキストを変更
        }
        isPlaying = !isPlaying;
    });
     // ★ここからキャラクターアニメーションのJavaScriptを追加！
    // 監視対象となるすべてのキャラクター要素を取得
    const characters = document.querySelectorAll('.character');

    // Intersection Observerの設定
    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 監視対象の10%が見えたらコールバック関数を実行
    };
// Intersection Observerのインスタンスを作成
    const characterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素が画面に入ったらアニメーション
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を停止しても良い
                // observer.unobserve(entry.target);
            } else {
                // 画面外に出たら元に戻す（必要に応じて）
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    characters.forEach(character => {
        characterObserver.observe(character);
    });

    // スクロール量に応じて直接制御する場合の例 (Intersection Observerがより推奨)
    // window.addEventListener('scroll', () => {
    //     const scrollY = window.scrollY;
    //     if (scrollY > 100) { // 例: 100pxスクロールしたら
    //         document.querySelector('.left-slide-in').classList.add('is-visible');
    //     }
    //     if (scrollY > 300) { // 例: 300pxスクロールしたら
    //         document.querySelector('.top-peek').classList.add('is-visible');
    //     }
    //     // ...他のキャラクターも同様に
    // });
}); // この閉じカッコがDOMContentLoadedのものです