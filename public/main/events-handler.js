/**
 * @class 
 */
class EventsHandler {
    constructor(googleMaps, activityRepository) {
        this.googleMaps = googleMaps;
        this.activityRepository = activityRepository;
    }

    getAllActivities() {
        let self = this;
        $.get('/loadAllActivities', (data) => {
            for (let i = 0; i < data.length; i++) {
                var marker = new google.maps.Marker({

                    //position: { lat: data[i].location.lat, lng: data[i].location.lng },
                    position: {lat: data[i].addressLoc.coordinates[1], lng: data[i].addressLoc.coordinates[0]},
                    label: {
                        text: data[i].category.charAt(0),
                        color: 'white',
                        fontSize: "18px"
                    },
                    title: data[i].subject
                });
                self.activityRepository.addMarker(marker)
                // To add the marker to the map, call setMap();
                marker.setMap(self.googleMaps.TogetherMap);
            }
        })
    }

    registerAddActivity() {
        $('#createActivity').on('click', () => {
            let $input = $("#postText");
            var obj = "";

            
                let self = this;
                $.post('/addActivity', obj, function (newActivity) {
                    //self.postsRepository.addPostFromDB(newPost);
                   // self.postsRenderer.renderPosts(self.postsRepository.posts);
                    $input.val("");
                })    
        });
    }

    registerRemoveActivity() {
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

    searchActivities() {
        // move to search page !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

        // $('#search-button').on('click', () => {
        //     let $input = $("#search-text");
        //     let val = $input.val();
        //     this.activityRepository.clearMarkers();
        //     // if ($input.val() === "") {
        //     //     alert("Please enter text!");
        //     // } else {}
        //     let self = this;
        //   ///  marker.setMap(self.googleMaps.TogetherMap);
        //     $.get('/findActivity/'+ val , (data) => {
        //         for (let i = 0; i < data.length; i++) {
        //             var marker = new google.maps.Marker({
    
        //                 position: { lat: data[i].location.lat, lng: data[i].location.lng },
        //                 label: {
        //                     text: data[i].category,
        //                     color: 'white',
        //                     fontSize: "8px"
        //                 },
        //                 title: data[i].subject
        //             });
        //             // To add the marker to the map, call setMap();
        //             marker.setMap(self.googleMaps.TogetherMap);
        //         }
        //     })
        //     $input.val("");                
        // });
       
        $("#search-button").click(function () {
            $("<a href=\"/search-activity/index.html?q="+$("#search-text").val()+"\"></a>").appendTo(document.body)[0].click();
        });
        
    }

}
//self.map.setCenter(this.marker.getPosition())
export default EventsHandler