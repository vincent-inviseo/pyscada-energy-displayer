$( document ).ready(function() {
    // faire en sorte d'afficher la dernière valeur connue pour la variable ici
    document.querySelectorAll(".pyscadaDateTimeChange").forEach(el=> {
        // el.addEventListener('pyscadaDateTimeChange', update_energy_displayer_value_on_element);
        varId = el.dataset["varId"];
        document.addEventListener('pyscadaVariableDataChange-'+varId, function(event) {
            update_energy_displayer_value_on_document(event, el);
        });
        // document.addEventListener('pyscadaVariableDataChange-'+varId, update_energy_displayer_value_on_element.bind(el));
    });
})

function update_energy_displayer_value(energy_widget_variable_id, e) {
    picker = $('#daterange').data('daterangepicker')
    console.log(energy_widget_variable_id)
    if(typeof(picker) != "undefined" && picker.startDate != null && picker.endDate != null) {
        data_handler_ajax(1,[energy_widget_variable_id,],[], picker.startDate.valueOf());
        console.log(picker)
        if(energy_widget_variable_id !== undefined && energy_widget_variable_id in DATA) {
            index_start = find_index_sub_lte(DATA[energy_widget_variable_id],picker.startDate.valueOf(),0);
            if(index_start == undefined) {
                index_start = find_index_sub_gte(DATA[energy_widget_variable_id],picker.startDate.valueOf(),0);
            }
            index_end = find_index_sub_lte(DATA[energy_widget_variable_id],picker.endDate.valueOf(),0);
            console.log(energy_widget_variable_id, index_start, index_end, picker.startDate.valueOf(), picker.endDate.valueOf(), DATA[energy_widget_variable_id])
            if(index_start != undefined && index_end != undefined) {
                value_of_start_index = DATA[energy_widget_variable_id][index_start][1]
                value_of_end_index = DATA[energy_widget_variable_id][index_end][1]
                value_computed = value_of_end_index - value_of_start_index
                console.log(energy_widget_variable_id, value_computed)
                e.innerHTML = parseFloat(value_computed).toFixed(2)
            }
        }
    }
}

function update_energy_displayer_value_on_element(e) {
    var energy_widget_variable_id = e.target.dataset.varId;
    update_energy_displayer_value(energy_widget_variable_id, e.target)

}

function update_energy_displayer_value_on_document(e, el) {
    var energy_widget_variable_id = e.type.split("-")[1];
    update_energy_displayer_value(energy_widget_variable_id, el)
}