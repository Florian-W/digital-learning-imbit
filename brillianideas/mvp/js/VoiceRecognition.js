//TODO
/**
 * Created by nick.london on 19.02.2017.
 */
var VoiceRecognition;
VoiceRecognition = {};
VoiceRecognition.isRecording = false;
VoiceRecognition.recognition = new webkitSpeechRecognition() || null,
    VoiceRecognition.startDictation = function (target, options) {
        options = options || {};

        if (VoiceRecognition.recognition != null && !VoiceRecognition.isRecording) {
            if (options.continous != undefined)
                VoiceRecognition.recognition.continuous = options.continous;

            if (options.interimResults != undefined)
                VoiceRecognition.recognition.interimResults = options.interimResults;

            if (options.maxAlternatives != undefined)
                VoiceRecognition.recognition.maxAlternatives = options.maxAlternatives;

            VoiceRecognition.recognition.onresult = function (e) {
                console.log(e);
                var array = e.results;
                var s = "";
                for (var i = 0, l = array.length; i < l; i++) {
                    s = (s + " " + array[i][0].transcript).trim();
                }
                target.val(s);
                var e = jQuery.Event('keyup');
                target.trigger(e);
            };
            function failedEnd(e) {
                console.log(e);
                VoiceRecognition.recognition.stop();
                isRecording = false;

            }

            VoiceRecognition.recognition.onerror = failedEnd;
            VoiceRecognition.recognition.onend = failedEnd;

            VoiceRecognition.recognition.lang = "de-DE";
            VoiceRecognition.recognition.start();
            VoiceRecognition.isRecording = true;
        }

    };
VoiceRecognition.stopDictation = function () {
    if (VoiceRecognition.recognition != null)
        VoiceRecognition.recognition.stop();
    VoiceRecognition.isRecording = false;
};