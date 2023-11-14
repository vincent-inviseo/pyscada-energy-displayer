var tripParisNewYork = 1750

$( document ).ready(function() {
    document.querySelectorAll(".pyscadaDateTimeChange").forEach(el=> {
        // el.addEventListener('pyscadaDateTimeChange', update_energy_displayer_value_on_element);
        varId = el.dataset["varId"];
        document.addEventListener('pyscadaVariableDataChange-'+varId, function(event) {
            update_energy_displayer_value_on_document(event, el);
        });
    });
})

function update_energy_displayer_value(energy_widget_variable_id, e, energyFactor, isDisplayEnergyConsummation) {
    picker = $('#daterange').data('daterangepicker')
    if(typeof(picker) != "undefined" && picker.startDate != null && picker.endDate != null) {
        data_handler_ajax(1,[energy_widget_variable_id,],[], picker.startDate.valueOf());
        if(energy_widget_variable_id !== undefined && energy_widget_variable_id in DATA) {
            index_start = find_index_sub_lte(DATA[energy_widget_variable_id],picker.startDate.valueOf(),0);
            if(index_start == undefined) {
                index_start = find_index_sub_gte(DATA[energy_widget_variable_id],picker.startDate.valueOf(),0);
            }
            index_end = find_index_sub_lte(DATA[energy_widget_variable_id],picker.endDate.valueOf(),0);
            if(index_start != undefined && index_end != undefined) {
                value_of_start_index = DATA[energy_widget_variable_id][index_start][1]
                value_of_end_index = DATA[energy_widget_variable_id][index_end][1]
                value_computed = value_of_end_index - value_of_start_index
                if(!energyFactor) {
                    e.innerHTML = parseFloat(value_computed).toFixed(2)
                } else {
                    e.innerHTML = parseFloat(value_computed * energyFactor).toFixed(2)
                    document.getElementById("emmission-co2-dsiplay-var-id-" + energy_widget_variable_id).innerHTML = (parseFloat(value_computed * energyFactor) / tripParisNewYork).toFixed(5)
                }
            }
        }
    }
}

function update_energy_displayer_value_on_element(e) {
    var energy_widget_variable_id = e.target.dataset.varId;
    var energyFactor = el.dataset.varEnergyFactor;
    update_energy_displayer_value(energy_widget_variable_id, e.target, parseFloat(energyFactor), isDisplayEnergyConsummation)

}

function update_energy_displayer_value_on_document(e, el) {
    var energyFactor = el.dataset.varEnergyFactor;
    var isDisplayEnergyConsummation = el.dataset.displayType
    var energy_widget_variable_id = e.type.split("-")[1];
    update_energy_displayer_value(energy_widget_variable_id, el, parseFloat(energyFactor), isDisplayEnergyConsummation)
}