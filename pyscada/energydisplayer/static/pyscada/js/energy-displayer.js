$( document ).ready(function() {
    document.querySelectorAll(".pyscadaDateTimeChange").forEach(el=>el.addEventListener('pyscadaDateTimeChange', update_energy_displayer_value));
})

function update_energy_displayer_value(e) {
    var energy_widget_variable_id = e.target.dataset.varId;
    data_handler_ajax(1,[energy_widget_variable_id,],[], e.detail.picker.startDate.valueOf());
    if(energy_widget_variable_id !== undefined && energy_widget_variable_id in DATA) {
        index_start = find_index_sub_lte(DATA[energy_widget_variable_id],e.detail.picker.startDate.valueOf(),0);
        console.log("index start ", index_start, e.detail.picker.startDate.valueOf());
        index_end = find_index_sub_lte(DATA[energy_widget_variable_id],e.detail.picker.endDate.valueOf(),0);
        console.log("index_end", index_end, e.detail.picker.endDate.valueOf());
        value_of_start_index = DATA[energy_widget_variable_id][index_start][1]
        value_of_end_index = DATA[energy_widget_variable_id][index_end][1]
        e.target.innerHTML = value_of_end_index - value_of_start_index
    }
}