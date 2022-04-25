define(['jquery', 'underscore', 'twigjs'], function ($, _, Twig) {
  var CustomWidget = function () {
    var self = this;
    const namePart = {
        'dashboard':'Рабочий стол',
        'llist':'Список сделок',
        'leads.pipeline':'Воронка сделок',
        'lcard':'Карточка сделки',
        'contacts.list':'Список контактов',
        'companies.list':'Список компаний',
        'culist':'Список покупателей',
        'cucard':'Карточка контакта',
        'comcard':'Карточка компании',
        'catalogs':'Список задач',
        'tlist':'todo лист задач',
        'stats.calls':'Аналитика -> Звонки',
        'stats.consolidate':'Аналитика -> Свободный отчет',
        'settings':'Настройки -> Интеграции',
        'settings.widget':'Настройки -> Интеграции -> Карточка виджета',
        'advanced_settings':'Настройки -> расширенные настройки виджета'
    };

    this.callbacks = {
      render: function () {
        return true;
      },
      init: _.bind(function () {
        let namePartAmo = AMOCRM.widgets.system.area;
        if(namePartAmo == 'clist') namePartAmo = AMOCRM.getV3WidgetsArea();

        if (AMOCRM.data.is_card){
            let typeCard = AMOCRM.getBaseEntity();
            let idCard = AMOCRM.data.current_card.id;
            let nameCard = " ";

            switch(typeCard){
                case 'companies': nameCard = AMOCRM.data.current_card.model.defaults['company[NAME]']; break;
                case 'leads': nameCard = AMOCRM.data.current_card.model.defaults['lead[NAME]']; break;
                case 'contacts': nameCard = AMOCRM.data.current_card.model.defaults['contact[FN]']; break;
            }
            console.log(namePartAmo + ", " + namePart[namePartAmo] + ", " + idCard + ", " + nameCard);
        } 
        else {
            console.log(namePart[namePartAmo] + ", " + namePartAmo);
        }
        return true;
      }, this),
      bind_actions: function () {
        return true;
      },
      settings: function () {
        return true;
      },
      onSave: function () {
        let dataAmo = AMOCRM.data.current_view['widget_obj']['params'];

        let login = dataAmo['login'];
        let password = dataAmo['password'];
        let user = dataAmo['user'];
        let users_lp = dataAmo['users_lp'];

        console.log("Логин " + login);
        console.log("Пароль " + password);
        console.log("Номер телефона Пользователя:");
        user = JSON.parse(user);
        for (const [key, value] of Object.entries(user)){        
            console.log("Ид Пользователя : " + key + " - " + "Номер телефона: " + value);
        }
        console.log("Пользователь и пароль:");
        users_lp = JSON.parse(users_lp);
        for (const [key, value] of Object.entries(users_lp)){
            console.log("Ид Пользователя : " + key + " - " + "Логин : " + value["login"] + " Пароль : " + value["password"]);
        }
        return true;
      },
      destroy: function () {

      }
    };
    return this;
  };

  return CustomWidget;
});