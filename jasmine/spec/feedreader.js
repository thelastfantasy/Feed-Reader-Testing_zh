/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function () {

    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function () {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();

            //必须确保allFeeds是一个有效的数组
            expect(Object.prototype.toString.call(allFeeds) === '[object Array]').toBeTruthy();

            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it("确保 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的", function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^https?:\/\//);
            });
        });

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it("确保 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的", function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(Object.prototype.toString.call(feed.name) === '[object String]').toBeTruthy();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */

    /* TODO:
     * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
     * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
     */

    /* TODO:
     * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
     * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
     * 再次点击的时候是否隐藏。
     */

    describe("The menu", function () {
        var body = document.body;
        var toggleIcon = document.querySelector(".menu-icon-link");

        // 确保菜单初始为隐藏状态
        it("确保页面加载完成后 body 上有 'menu-hidden' 类名", function () {
            expect(body.className).toContain("menu-hidden");
        });

        // 确保点击切换按钮时能够正确切换'menu-hidden'类名
        it("确保当点击切换按钮时能够正确开关 'menu-hidden' 类名", function () {
            toggleIcon.click();
            expect(body.className).not.toContain("menu-hidden");

            toggleIcon.click();
            expect(body.className).toContain("menu-hidden");
        });
    });

    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */

    /* TODO:
     * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
     * 里面至少有一个 .entry 的元素。
     *
     * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
     * 和异步的 done() 函数。
     */

    describe("Initial Entries", function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it("确保 loadFeed 函数调用后 .feed 容器元素内至少有一个 .entry 元素", function (done) {
            var entriesCount = document.querySelectorAll(".feed .entry").length;
            expect(entriesCount).toBeGreaterThan(0);
            done();
        });

        it("确保 .entry 元素中的超链接符合规范", function (done) {
            var entries = document.querySelectorAll(".feed .entry-link");
            for (let i = 0; i < entries.length; i++) {
                expect(entries[i].href).toMatch(/^https?:\/\//);
            }
            done();
        });
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */

    /* TODO:
     * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
     * 记住，loadFeed() 函数是异步的。
     */

    // 注释掉本行可能导致jasmine超时错误
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    describe("New Feed Selection", function () {
        var initFeedFirstEntry;
        beforeEach(function (done) {
            loadFeed(0, function () {
                initFeedFirstEntry = document.querySelector(".feed .entry-link").innerHTML;

                loadFeed(1, function () {
                    done();
                });
            });
        });

        it("确保每次加载一个 feed 时 .feed 内容会做出相应的更新", function (done) {
            var newFeedFirstEntry = document.querySelector(".feed .entry-link").innerHTML;
            expect(initFeedFirstEntry).not.toBe(newFeedFirstEntry);
            done();
        });
    });
}());
