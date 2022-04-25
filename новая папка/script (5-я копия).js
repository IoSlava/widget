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
        'ccard':'Карточка контакта',
        'comcard':'Карточка компании',
        'catalogs':'Список задач',
        'tlist':'todo лист задач',
        'stats.calls':'Аналитика -> Звонки',
        'stats.consolidate':'Аналитика -> Свободный отчет',
        'settings':'Настройки -> Интеграции',
        'settings.widget':'Настройки -> Интеграции -> Карточка виджета',
        'advanced_settings':'Настройки -> расширенные настройки виджета'
    };

    this.getTemplate = _.bind(function (template, params, callback) {
      params = (typeof params == 'object') ? params : {};
      template = template || '';

      return this.render({
        href: '/templates/' + template + '.twig',
        base_path: this.params.path,
        v: this.get_version(),
        load: callback
      }, params);
    }, this);

    this.callbacks = {
      render: function () {
        return true;
      },
      init: _.bind(function () {
        let namePartAmo = AMOCRM.widgets.system.area;
        if(namePartAmo == 'clist') namePartAmo = AMOCRM.getV3WidgetsArea();

        if (AMOCRM.data.is_card)
        {
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
        else 
        {

            console.log(namePart[namePartAmo] + ", " + namePartAmo);
        }
        return true;
      }, this),
      bind_actions: function () {
        //console.log('bind_actions');
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
        for (const [key, value] of Object.entries(user))
        {        
            console.log("Ид Пользователя : " + key + " - " + "Номер телефона: " + value);
        }
        console.log("Пользователь и пароль:");
        users_lp = JSON.parse(users_lp);
        for (const [key, value] of Object.entries(users_lp))
        {
            console.log("Ид Пользователя : " + key + " - " + "Логин : " + value["login"] + " Пароль : " + value["password"]);
        }
        return true;
      },
      destroy: function () {

      },
      advancedSettings: _.bind(function () {
        var $work_area = $('#work-area-' + self.get_settings().widget_code),
          $save_button = $(
            Twig({ref: '/tmpl/controls/button.twig'}).render({
              text: 'Сохранить',
              class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
              additional_data: ''
            })
          ),
          $cancel_button = $(
            Twig({ref: '/tmpl/controls/cancel_button.twig'}).render({
              text: 'Отмена',
              class_name: 'button-input-disabled js-button-cancel-' + self.get_settings().widget_code,
              additional_data: ''
            })
          );

        console.log('Зашел в advancedSettings');

        $save_button.prop('disabled', true);
        $('.content__top__preset').css({float: 'left'});

        $('.list__body-right__top').css({display: 'block'})
          .append('<div class="list__body-right__top__buttons"></div>');
        $('.list__body-right__top__buttons').css({float: 'right'})
          .append($cancel_button)
          .append($save_button);

        self.getTemplate('advanced_settings', {}, function (template) {
          var $page = $(
            template.render({title: self.i18n('advanced').title, widget_code: self.get_settings().widget_code})
          );

          $work_area.append($page);
        });
      }, self),
    };
    return this;
  };

  return CustomWidget;
});