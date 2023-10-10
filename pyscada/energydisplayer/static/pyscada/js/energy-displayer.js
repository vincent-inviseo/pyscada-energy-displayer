$( document ).ready(function() {
    document.querySelectorAll(".pyscadaDateTimeChange").forEach(el=>el.addEventListener('pyscadaDateTimeChange', update_energy_displayer_value));
    console.log('document ready')
 })

function update_energy_displayer_value(e) {
    var energy_widget_variable_id = e.target.dataset.varId;
    if(energy_widget_variable_id !== undefined) {
        console.log('energy_widget_variable_id ', energy_widget_variable_id);
        if(DATA !== undefined && energy_widget_variable_id !== undefined && energy_widget_variable_id in DATA) {
            index_start = find_index_sub_lte(DATA[energy_widget_variable_id],e.detail.picker.startDate,0);
            index_end = find_index_sub_lte(DATA[energy_widget_variable_id],e.detail.picker.endDate,0);
            computed_index = index_end - index_start
            latest_value_of_variable = DATA[energy_widget_variable_id][computed_index][1]
            console.log('latest_value_of_variable', latest_value_of_variable)
            e.target.innerHTML = latest_value_of_variable
        }
    }
}