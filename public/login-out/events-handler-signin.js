/**
 * @class 
 */
class EventsHandler {
    constructor(loginOut) {
        this.loginOut = loginOut;
    }
    registerAddUser() {
        $('#sign').on('click', () => {
            let $name = $("#inputEmail");
            let $password = $('#inputPassword')
            var user = {
                name: $name.val(),
                password: $password.val(),
                registered: false
            };
            this.loginOut.addUser(user);
            $name.val('');
            $password.val('');
        });
    }

    registerRemoveUser() {
       /*  this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data('id');
            let self = this;
            $.ajax({
                method: 'DELETE',
                url: '/deletePost/' + postId,
                success: () => {
                    self.postsRepository.removePost(index);
                    self.postsRenderer.renderPosts(self.postsRepository.posts);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                }
            });
        }); */
    }
}

export default EventsHandler