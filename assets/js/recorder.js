var init2 = false;
jQuery(function () {
    return
    if (init2) return
    init2 = true





    $.widget("custom.recorder", {
        options: {
            recordButtonSelector: "#record",
            previewSelector: "#preview",
            resultsContainerSelector: "#uploads",
            reloadSelector: "#try-again",
            recordHintSelector: "#record-hint",
        },
        _create: function (q) {
            this.instance = this;
            this.state = "idle";
            this.chunks = [];
            this.mediaRecorder = undefined
            this.recordButton = $(this.element).find(this.options.recordButtonSelector).first().get()[0]
            this.preview = $(this.element).find(this.options.previewSelector).first().get()[0]
            this.reloadButton = $(this.element).find(this.options.reloadSelector).first().get()[0]
            this.hint = $(this.element).find(this.options.recordHintSelector).first().get()[0]
            
        },
        destroy: function () {
              this.mediaRecorder?.stop()
        },
        init: function (audio=true, video=true) {

            if (navigator.mediaDevices) {
                const constraints = { audio, video };
                this.chunks = [];
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then((stream) => {
                        const mediaRecorder = new MediaRecorder(stream);
                        this.mediaRecorder = mediaRecorder

                        this.preview.src = undefined
                        this.preview.srcObject = stream;
                        const t = this
                        $(this.reloadButton).on('click', function (e) {
                            t.init()
                        });
                        var that = this
                        stop = function() {
                            stream.getTracks().forEach(e => {
                                e.stop(0)
                            })
                            that.recordButton.style.background = "";
                            that.recordButton.style.color = "";
                            that.state = "idle"
                
                        }
                        this.recordButton.onclick = () => {
                            if (this.state === 'idle') {
                                this.mediaRecorder.start();
                                this.recordButton.style.background = "red";
                                this.recordButton.style.color = "black";
                                this.state = "recording"
                                $(this.hint).detach()
                            } else {
                                stop();
                            }
                        };
                        
                        mediaRecorder.onstop = (e) => {
                            console.log("data available after MediaRecorder.stop() called.");
                        };

                        $(window).on("record-modal-closed", function() {
                            stop();
                            
                        })

                        mediaRecorder.ondataavailable = (e) => {
                            this.chunks.push(e.data);
                            this.preview.setAttribute("controls", "");


                            this.preview.controls = true;
                            const type = this.options.video ? "video/webm" : "audio/ogg; codecs=opus"
                            const blob = new Blob(this.chunks, { type });
                            this.chunks = [];
                            const audioURL = URL.createObjectURL(blob);
                            this.preview.src = audioURL;
                            this.preview.srcObject = undefined
                            console.log("recorder stopped");
                        };
                    })
                    .catch((err) => {
                        console.error(`The following error occurred: ${err}`);
                    });
            }
        },


    })

    const recorder = $(".recorder-section").recorder()

    $(window).on("record-modal-opened", () => {
        $(recorder).recorder('instance').init()
    })
    $(window).on("record-modal-closed", () => {
        $(recorder).recorder('instance').destroy()
    })
})
