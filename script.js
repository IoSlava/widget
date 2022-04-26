define(['jquery', 'underscore', 'twigjs'], function ($, _, Twig) {
    var CustomWidget = function () {
        const namePart = {
            'dashboard':'Рабочий стол',
            'llist':'Список сделок',
            'leads.pipeline':'Воронка сделок',
            'lcard':'Карточка сделки',
            'contacts.list':'Список контактов',
            'companies.list':'Список компаний',
            'culist':'Список покупателей',
            'ccard':'Карточка контакта',
            'comcard':'Карточка компании',
            'cucard' : 'Карточка покупателя',
            'catalogs':'Список задач',
            'tcalendar':'календарь Задач',
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
                function getNameEntity() {
                    let namePartAmo = AMOCRM.widgets.system.area;
                    if (namePartAmo == 'outer_space' || namePartAmo == 'clist') namePartAmo = AMOCRM.getV3WidgetsArea();
                    return namePartAmo;
                }

                function getNameEntityRU(namePartAmo) {
                    let path = window.location.pathname; 
                    if (path == '/contacts/list/') namePart[namePartAmo] = 'Общий список Контактов и Компаний';
                    return namePart[namePartAmo];
                }

                function getNameCard(typeCard) {
                    let nameCard = "";
                    switch (typeCard) {
                        case 'companies': nameCard = AMOCRM.data.current_card.model.defaults['contact[NAME]']; break;
                        case 'leads': nameCard = AMOCRM.data.current_card.model.defaults['lead[NAME]']; break;
                        case 'contacts': nameCard = AMOCRM.data.current_card.model.defaults['contact[FN]']; break;
                        case 'customers': nameCard = AMOCRM.data.current_card.model.defaults['name']; break;
                    }
                    return nameCard;
                }

                let namePartAmo = getNameEntity();
                let namePartAmoRu = getNameEntityRU(namePartAmo);

                if (AMOCRM.data.is_card) {
                    let typeCard = AMOCRM.getBaseEntity();
                    let idCard = AMOCRM.data.current_card.id;
                    let nameCard = getNameCard(typeCard);

                    console.log(namePartAmo + ", " + namePartAmoRu + ", " + idCard + ", " + nameCard);
                } else {
                    console.log(namePartAmoRu + ", " + namePartAmo);
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